// src/user-permission/user-permissions.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPermission } from './entity/user-permission.entity';
import {
  CreateUserPermissionDto,
  UpdateUserPermissionDto,
} from './dtos/user-permission.dto';
import { User } from 'src/users/entity/user.entity';
import { Permission } from 'src/permissions/entity/permission.entity';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(UserPermission)
    private readonly userPermissionRepo: Repository<UserPermission>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async create(dto: CreateUserPermissionDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new BadRequestException('Invalid user_id');

    const permission = await this.permissionRepo.findOne({
      where: { id: dto.permission_id },
    });
    if (!permission) throw new BadRequestException('Invalid permission_id');

    if (permission.guard !== 'user') {
      throw new BadRequestException('Permission must be for user guard only');
    }

    const record = this.userPermissionRepo.create(dto);
    return await this.userPermissionRepo.save(record);
  }

  async findAll() {
    return await this.userPermissionRepo.find();
  }

  async findOne(id: number) {
    const record = await this.userPermissionRepo.findOne({
      where: { id },
      relations: ['user', 'permission'],
    });
    if (!record) throw new NotFoundException('Record not found');
    return record;
  }

  async update(id: number, dto: UpdateUserPermissionDto) {
    const existing = await this.userPermissionRepo.findOne({ where: { id } });
    if (!existing)
      throw new NotFoundException('User Permission Assignment not found');

    if (dto.user_id) {
      const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
      if (!user) throw new BadRequestException('Invalid user_id');
      existing.user_id = dto.user_id;
      existing.user = user;
    }

    if (dto.permission_id) {
      const permission = await this.permissionRepo.findOne({
        where: { id: dto.permission_id },
      });
      if (!permission) throw new BadRequestException('Invalid permission_id');

      if (permission.guard !== 'user') {
        throw new BadRequestException('Permission must be for user guard only');
      }

      existing.permission_id = dto.permission_id;
      existing.permission = permission;
    }

    await this.userPermissionRepo.save(existing);
    return this.findOne(id);
  }

  async remove(id: number) {
    const record = await this.userPermissionRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return await this.userPermissionRepo.remove(record);
  }
}
