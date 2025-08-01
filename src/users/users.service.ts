// src/users/users.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDetails } from './entity/user_details.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import { UserDetailsDto } from './dtos/user_details.dto';
import * as bcrypt from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import { Role } from 'src/roles/entity/roles.entity';
import { UserRole } from 'src/assig-roles-user/entity/user-role.entity';
import { City } from 'src/city/entity/city.entity';
import { Zone } from 'src/zone/entity/zone.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepo: Repository<UserRole>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,
  ) { }

  /* ─────────────────────────────── CREATE USER ─────────────────────────────── */
  async storeUser(dto: CreateUserDto) {
    try {
      const exists = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (exists)
        throw new BadRequestException('User with this email already exists');

      if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
      const city = await this.cityRepo.findOne({ where: { id: dto.city_id } });
      if (!city) throw new NotFoundException('City not found');
      const zone = await this.zoneRepo.findOne({ where: { id: dto.zone_id } });
      if (!zone) throw new NotFoundException('Zone not found');
      const saved = await this.userRepository.save(
        this.userRepository.create({
          name: dto.name,
          email: dto.email,
          password: dto.password,
          phone: dto.phone,
          address: dto.address,
          city_id: dto.city_id,
          city: city,
          zone_id: dto.zone_id,
          zone: zone,
          image: dto.image,
        }),
      );
      const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
      if (!role) throw new NotFoundException('Role not found');
      const userRole = await this.userRoleRepo.create({
        user_id: saved.id,
        user: saved,
        role_id: role.id,
        role: role,
        
      });
      await this.userRoleRepo.save(userRole);
      const { password, access_token, ...clean } = saved;

      return {
        success: true,
        message: 'User has been created',
        data: saved,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  /* ─────────────────────────────── LIST USERS ─────────────────────────────── */
  async idnex() {
    // kept the original route name; consider renaming to "index" later
    try {
      const users = await this.userRepository.find({ relations: ['details'] });
      const data = users.map(({ password, access_token, ...rest }) => rest);
      return { success: true, message: 'User list', data };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  /* ─────────────────────────────── FIND BY ID ─────────────────────────────── */
  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['details'],
      });
      if (!user) throw new NotFoundException('User not found');

      const { password, access_token, ...clean } = user;
      return { success: true, message: 'User fetched', data: clean };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  /* ─────────────────────────────── FIND BY EMAIL ─────────────────────────────── */
  async findOnByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['details'],
      });
      if (!user) throw new NotFoundException('User not found');

      const { password, access_token, ...clean } = user;
      return { success: true, message: 'User fetched', data: clean };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  /* ─────────────────────────────── UPDATE USER ─────────────────────────────── */
  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      /* ✅ NEW: exclude current record when checking email uniqueness */
      if (dto.email) {
        const dup = await this.userRepository.findOne({
          where: { email: dto.email, id: Not(id) },
        });
        if (dup) throw new BadRequestException('Email already exists');
      }

      if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
      if (!dto.image) dto.image = user.image;

      Object.assign(user, dto);
      const saved = await this.userRepository.save(user);

      const { password, access_token, ...clean } = saved;
      return { success: true, message: 'User updated', data: clean };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  /* ─────────────────────────────── TOGGLE STATUS ─────────────────────────────── */
  async statusUpdate(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      user.status = user.status === 0 ? 1 : 0;
      const saved = await this.userRepository.save(user);

      const { password, access_token, ...clean } = saved;
      const msg =
        saved.status === 1
          ? 'User has been activated successfully'
          : 'User has been deactivated successfully';

      return { success: true, message: msg, data: clean };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  /* ─────────────────────────────── CREATE USER DETAILS ─────────────────────────────── */
  async create_user_details(dto: UserDetailsDto, user: User) {
    try {
      const exists = await this.userDetailsRepository.findOne({
        where: { user: { id: user.id } },
      });
      if (exists) throw new BadRequestException('User details already exist');

      const details = this.userDetailsRepository.create({
        identity_no: dto.identity_no,
        identity_validity_date: dto.identity_validity_date,
        identity_card_front_url: dto.identity_card_front_url,
        identity_card_back_url: dto.identity_card_back_url,
        user,
      });

      const saved = await this.userDetailsRepository.save(details);
      return {
        success: true,
        message: 'User details added',
        data: saved,
      };
    } catch (err) {
      this.handleUnknown(err);
    }
  }

  /* ─────────────────────────────── PRIVATE ─────────────────────────────── */
  private handleUnknown(err: unknown): never {
    if (
      err instanceof BadRequestException ||
      err instanceof NotFoundException
    ) {
      throw err; // preserve intended HTTP code
    }
    throw new InternalServerErrorException('Unexpected error', {
      cause: err as Error,
    });
  }
}
