import { BadRequestException, Injectable } from '@nestjs/common';
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

  login(admin: Admin) {
    const paylod = { sub: admin.id, email: admin.email };

    return {
      access_token: this.jwtSerrvice.sign(paylod),
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }
}
