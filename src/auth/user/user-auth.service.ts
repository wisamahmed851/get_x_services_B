import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';
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

  login(user: { id: number; email: string; name: string }) {
    const paylod = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(paylod),
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
