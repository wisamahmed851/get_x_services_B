import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async storeUser(user: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: { email: user.email },
    });
    console.log(existing);
    if (existing) {
      throw new BadRequestException('User With This Email Already Exists');
    }
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async idnex() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    return user;
  }
  async findOnByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    return user;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const existing = await this.userRepository.findOne({
      where: { id },
    });
    if (!existing) {
      throw new BadRequestException('User not Found');
    }
    if (user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: user.email, id: Not(id) },
      });
      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }
    }
    if (!user.image) {
      user.image = existing.image;
    }
    Object.assign(existing, user);
    return await this.userRepository.save(existing);
  }
}
