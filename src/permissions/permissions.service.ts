// src/permissions/permissions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entity/permission.entity';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dtos/permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  create(data: CreatePermissionDto) {
    const permission = this.permissionRepo.create(data);
    return this.permissionRepo.save(permission);
  }

  findAll() {
    return this.permissionRepo.find();
  }

  async findOne(id: number) {
    const permission = await this.permissionRepo.findOneBy({ id });
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: number, data: UpdatePermissionDto) {
    const permission = await this.findOne(id);
    Object.assign(permission, data);
    return this.permissionRepo.save(permission);
  }

  async remove(id: number) {
    const permission = await this.findOne(id);
    return this.permissionRepo.remove(permission);
  }
}
