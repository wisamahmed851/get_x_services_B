import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { UserRole } from 'src/assig-roles-user/entity/user-role.entity';
import { UpdateProfileDto, UserRegisterDto } from './dtos/user-auth.dto';
import { cleanObject } from 'src/common/utils/sanitize.util';
import { response } from 'express';
import { City } from 'src/city/entity/city.entity';
import { Zone } from 'src/zone/entity/zone.entity';
import { UserDetails } from 'src/users/entity/user_details.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @InjectRepository(UserRole)
    private userRoleRepo: Repository<UserRole>,

    @InjectRepository(City)
    private cityRepo: Repository<City>,

    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,

    @InjectRepository(UserDetails)
    private userDetailsRepo: Repository<UserDetails>,

    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) { }

  private handleUnknown(err: unknown): never {
    if (
      err instanceof BadRequestException ||
      err instanceof NotFoundException
    ) {
      throw err;
    }
    throw new InternalServerErrorException('Unexpected error occurred', {
      cause: err as Error,
    });
  }

  async register(
    body: UserRegisterDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const oldUsers = await queryRunner.manager.find(User, {
        where: { email: body.email },
      });

      if (oldUsers.length > 0) {
        throw new BadRequestException('User with this email already exists');
      }

      // Hash password
      if (body.password) {
        body.password = await bcrypt.hash(body.password, 10);
      }

      // Validate city and zone
      if (body.city_id) {
        const city = await queryRunner.manager.findOne(City, { where: { id: body.city_id } });
        if (!city) throw new NotFoundException('City not found');
      }

      if (body.zone_id) {
        const zone = await queryRunner.manager.findOne(Zone, { where: { id: body.zone_id } });
        if (!zone) throw new NotFoundException('Zone not found');
      }

      const user = await queryRunner.manager.getRepository(User).
        create({
          name: body.name,
          email: body.email,
          password: body.password,
          phone: body.phone,
          gender: body.gender,
          zone_id: body.zone_id,
          city_id: body.city_id,
        });
      const savedUser = await queryRunner.manager.save(User, user);
      // const savedUser = await this.userRepository.save(user);

      // Fetch role by name
      let role;
      if (body.role === 'customer' || body.role === 'provider') {
        role = await queryRunner.manager.findOne(Role, {
          where: { name: body.role },
          select: { id: true, name: true },
        });

        if (!role) throw new BadRequestException('Role Not Found');

        // Save UserRole
        const userRole = queryRunner.manager.getRepository(UserRole).create({
          user_id: savedUser.id,
          user: savedUser,
          role_id: role.id,
          role: role,
        });
        const savedUserRole = await queryRunner.manager.save(UserRole, userRole);
        if (!savedUserRole) {
          throw new InternalServerErrorException('Failed to assign role to user');
        }
      }

      // 💡 Conditional handling of user details
      if (body.role === 'provider') {
        if (!body.identity_no || !body.identity_validity_date) {
          throw new BadRequestException('Identity number and validity date are required for providers');
        }
        if (!body.identity_card_front_url && !body.identity_card_back_url) {
          throw new BadRequestException('Identity card images are required for providers');
        }


        const userDetails = queryRunner.manager.getRepository(UserDetails).
          create({
            identity_no: body.identity_no,
            identity_validity_date: body.identity_validity_date,
            identity_card_front_url: body.identity_card_front_url,
            identity_card_back_url: body.identity_card_back_url,
            user: savedUser,
            user_id: savedUser.id,
          });
        const savedUserDetails = await queryRunner.manager.save(UserDetails, userDetails)
        // savedUser.userDetails = savedUserDetails;
      }
      await queryRunner.commitTransaction();
      // Fetch full user with role
      const userWithRole = await queryRunner.manager.findOne(User, {
        where: { id: savedUser.id },
        relations: ['userRoles', 'userRoles.role', 'userDetails'],
      });

      if (!userWithRole) {
        throw new InternalServerErrorException('User not found after registration');
      }

      const { password, userRoles, ...userWithoutPassword } = userWithRole;
      return {
        success: true,
        message: 'User is registered successfully',
        data: {
          user: userWithoutPassword,
          role: role,
        },
      };
    } catch (err) {

      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      console.error('Registration error:', err);
      this.handleUnknown(err)
    } finally {
      await queryRunner.release()
    }
  }

  async validateUser(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const user = await this.userRepository.findOne({
        where: { email: email.toLowerCase().trim() },
      });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid password');
      }

      return user;
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async login(user: User) {
    try {
      const roles = await this.userRoleRepo.find({
        where: { user_id: user.id },
        relations: ['role'],
        select: {
          role: {
            id: true,
            name: true,
          },
        },
      });
      const roleNames = roles.map((r) => r.role.name);
      const payload = {
        sub: user.id,
        email: user.email,
        roles: roleNames,
      };

      const token = this.jwtService.sign(payload, { expiresIn: '7d' });
      user.access_token = token;

      await this.userRepository.save(user);

      const { password, access_token, ...cleanUser } = user;
      const userRole = roles[0]?.role;
      return {
        success: true,
        message: 'User has been successfully logged in',
        data: {
          access_token: token,
          user: cleanUser,
          role: userRole
            ? {
              id: userRole.id,
              name: userRole.name,
            }
            : null,
        },
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async profile(user: User) {
    try {
      const loginUser = await this.userRepository.findOne({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          gender: true,
          street: true,
          district: true,
          image: true,
          status: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!loginUser) {
        throw new NotFoundException('User not found');
      }

      return {
        success: true,
        message: 'User profile fetched successfully',
        data: loginUser,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async profileUpdate(user: User, body: UpdateProfileDto) {
    try {
      const exist = await this.userRepository.findOne({
        where: { id: user.id },
      });
      if (!exist) {
        throw new NotFoundException('User Not Found');
      }
      if (body.name !== undefined) exist.name = body.name;
      if (body.street !== undefined) exist.street = body.street;
      if (body.district !== undefined) exist.district = body.district;
      if (body.address !== undefined) exist.address = body.address;
      if (body.gender !== undefined) exist.gender = body.gender;
      if (body.phone !== undefined) exist.phone = body.phone;
      if (body.image !== undefined) exist.image = body.image;

      const savedUser = await this.userRepository.save(exist);

      return {
        success: true,
        message: 'Password updated successfully',
        data: savedUser,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async changePassword(
    body: { oldPassword: string; newPassword: string },
    user: User,
  ) {
    try {
      const { oldPassword, newPassword } = body;

      if (!oldPassword || !newPassword) {
        throw new BadRequestException(
          'Both old and new passwords are required',
        );
      }

      const loginUser = await this.userRepository.findOne({
        where: { id: user.id },
      });

      if (!loginUser) {
        throw new NotFoundException('User not found');
      }

      const matched = await bcrypt.compare(oldPassword, loginUser.password);
      if (!matched) {
        throw new BadRequestException('Old password is incorrect');
      }

      if (newPassword.trim().length < 6) {
        throw new BadRequestException(
          'New password must be at least 6 characters long',
        );
      }

      loginUser.password = await bcrypt.hash(newPassword.trim(), 10);
      await this.userRepository.save(loginUser);

      return {
        success: true,
        message: 'Password updated successfully',
        data: {},
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async modeChnage(user: User) {
    try {
      const currentUser = await this.userRepository.findOne({
        where: { id: user.id },
      });
      if (!currentUser) throw new NotFoundException('Driver not Found');

      currentUser.isOnline = currentUser.isOnline === 1 ? 0 : 1;
      const saved = await this.userRepository.save(currentUser);
      const is = currentUser.isOnline === 1 ? 'Online' : 'Ofline';
      return {
        success: true,
        message: `Driver is ${is} now`,
        data: saved,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  async logout(data: User) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: data.id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.access_token = '';
      await this.userRepository.save(user);

      return {
        success: true,
        message: 'User has been logged out successfully',
        data: {},
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }
}
