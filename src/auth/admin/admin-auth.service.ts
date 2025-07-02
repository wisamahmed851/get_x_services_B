import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entity/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtSerrvice: JwtService,
  ) {}

  async validateEmail(email: string, password: string) {
    const admin = await this.adminRepo.findOne({
      where: { email },
    });
    if (!admin) throw new BadRequestException('Invalid Admin Credentials');

    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new BadRequestException('Invlaid password');

    return admin;
  }

  async login(admin: Admin) {
    const paylod = { sub: admin.id, email: admin.email };
    const token = this.jwtSerrvice.sign(paylod);
    admin.access_token = token;
    await this.adminRepo.save(admin);
    return {
      access_token: token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }

  async getProfile(admin: any) {
    const loginAdmin = await this.adminRepo.findOne({
      where: { id: admin.id },
    });
    if (!loginAdmin) throw new BadRequestException('user Not Found');

    return loginAdmin;
  }

  async passwordChange(
    body: { oldPassword: string; newPassword: string },
    admin: any,
  ) {
    const loginAdmin = await this.adminRepo.findOne({
      where: { id: admin.id },
    });

    if (!loginAdmin) {
      throw new NotFoundException('Admin not found');
    }

    const matched = await bcrypt.compare(body.oldPassword, loginAdmin.password);
    if (!matched) {
      throw new BadRequestException('Old password does not match');
    }

    if (!body.newPassword || body.newPassword.trim().length < 6) {
      throw new BadRequestException(
        'New password must be at least 6 characters',
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.newPassword, saltRounds);
    loginAdmin.password = hashedPassword;

    await this.adminRepo.save(loginAdmin);

    return {
      message: 'Password has been successfully updated',
    };
  }

  async logout(admin: Admin) {
    admin.access_token = '';
    await this.adminRepo.save(admin);

    return {
      message: 'Logged out Successfully',
    };
  }
}
