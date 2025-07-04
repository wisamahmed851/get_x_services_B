// src/role-permissions/role-permissions.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRolePermissionAssigningDto,
  UpdateRolePermissionAssigningDto,
} from './dto/role-permission.dto';
import { RolePermissions } from './entity/role-permission.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { Permission } from 'src/permissions/entity/permission.entity';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermissions)
    private readonly rolePermissionRepo: Repository<RolePermissions>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async create(dto: CreateRolePermissionAssigningDto) {
    // ✅ Validate role_id
    const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
    if (!role) throw new BadRequestException('Invalid role_id');

    // ✅ Validate permission_id
    const permission = await this.permissionRepo.findOne({
      where: { id: dto.permission_id },
    });
    if (!permission) throw new BadRequestException('Invalid permission_id');
    if (role.guard !== permission.guard) {
      throw new BadRequestException(
        `You Can't assing the ${permission.guard} to ${permission.guard == 'user' ? 'admin' : 'user'}`,
      );
    }
    const rolePermission = this.rolePermissionRepo.create(dto);
    return await this.rolePermissionRepo.save(rolePermission);
  }

  async findAll() {
    return await this.rolePermissionRepo.find();
  }

  async findOne(id: number) {
    const record = await this.rolePermissionRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return record;
  }

  async update(id: number, dto: UpdateRolePermissionAssigningDto) {
    const existing = await this.rolePermissionRepo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('RolePermission not found');
    const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
    if (!role) throw new BadRequestException('Invalid role_id');

    existing.role_id = dto.role_id;
    existing.role = role;
    const permission = await this.permissionRepo.findOne({
      where: { id: dto.permission_id },
    });
    if (!permission) throw new BadRequestException('Invalid permission_id');

    existing.permission_id = dto.permission_id;
    existing.permission = permission;
    if (role.guard !== permission.guard) {
      throw new BadRequestException(
        `You Can't assing the ${permission.guard} to ${permission.guard == 'user' ? 'admin' : 'user'}`,
      );
    }
    await this.rolePermissionRepo.save(existing);

    return this.rolePermissionRepo.findOne({
      where: { id },
      relations: ['role', 'permission'],
    });
  }

  async remove(id: number) {
    const record = await this.rolePermissionRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return await this.rolePermissionRepo.remove(record);
  }
}
