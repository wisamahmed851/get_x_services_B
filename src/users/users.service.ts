import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import { throwError } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserDetails } from './entity/user_details.entity';
import { UserDetailsDto } from './dtos/user_details.dto';
import { use } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private userDetailsRepository: Repository<UserDetails>,
  ) {}

  // user crud
  async storeUser(user: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existing) {
      throw new BadRequestException('User With This Email Already Exists');
    }
    if (user.password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    if (user.role_id == null) user.role_id = 1;

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async idnex() {
    return await this.userRepository.find({
      relations: ['details'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['details'],
    });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    return user;
  }
  async findOnByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: ['details'],
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
    if (user.password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    if (!user.image) {
      user.image = existing.image;
    }
    if (user.role_id == null) user.role_id = 1;
    Object.assign(existing, user);
    return await this.userRepository.save(existing);
  }
  async statusUpdate(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('The user is not found');
    }

    user.status = user.status === 0 ? 1 : 0;

    const updatedUser = await this.userRepository.save(user);

    const userMessage =
      updatedUser.status === 1
        ? 'User Has Been Activated Successfully'
        : 'User Has Beeen Deactivated Successfully';

    return {
      message: userMessage,
      user: updatedUser,
    };
  }

  // user details crud

  async create_user_details(userDetails: UserDetailsDto, user: User) {
    const existingDetails = await this.userDetailsRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (existingDetails) {
      throw new BadRequestException('User details already exist');
    }
    const user_Details = await this.userDetailsRepository.create({
      license_no: userDetails.license_no,
      license_validity_date: userDetails.license_validity_date,
      identity_no: userDetails.identity_no,
      identity_validity_date: userDetails.identity_validity_date,
      user,
    });

    const savedUserDetils = await this.userDetailsRepository.save(user_Details);
    return {
      message: 'User details have been added successfully',
      userDetails: savedUserDetils,
    };
  }
}
