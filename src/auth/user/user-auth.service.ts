import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid Passord');

    return user;
  }

  async login(user: User) {
    const paylod = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(paylod);
    user.access_token = token;
    await this.userRepository.save(user);
    return {
      success: true,
      message: 'User has been successfully logged in',
      access_token: token,
      data: user,
    };
  }

  async profile(user: any) {
    const loginUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!loginUser) throw new NotFoundException('User Not Found');

    return loginUser;
  }

  async changePassword(
    body: { oldPassword: string; newPassword: string },
    user: any,
  ) {
    const loginUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!loginUser) throw new NotFoundException('User Not FOund');

    const matched = await bcrypt.compare(body.oldPassword, loginUser.password);
    if (!matched) throw new BadRequestException('Old Password is invalid');

    if (!body.newPassword || body.newPassword.trim().length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.newPassword, saltRounds);
    loginUser.password = hashedPassword;

    await this.userRepository.save(loginUser);

    return {
      message: 'Password has been successfully updated',
    };
  }

  async logout(data: User) {
    const user = await this.userRepository.findOne({
      where: {id: data.id},
    });
    if (!user) {
      throw new NotFoundException("User Not Found");
    }
    user.access_token = '';
    await this.userRepository.save(user);

    return {
      message: 'User has been logout',
    };
  }
}
