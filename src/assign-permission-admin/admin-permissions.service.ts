// src/admin-permission/admin-permissions.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPermission } from './entity/admin-permission.entity';
import {
  CreateAdminPermissionDto,
  UpdateAdminPermissionDto,
} from './dtos/admin-permission.dto';
import { Admin } from 'src/admin/entity/admin.entity';
import { Permission } from 'src/permissions/entity/permission.entity';

@Injectable()
export class AdminPermissionsService {
  constructor(
    @InjectRepository(AdminPermission)
    private readonly adminPermissionRepo: Repository<AdminPermission>,

    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async create(dto: CreateAdminPermissionDto) {
    const admin = await this.adminRepo.findOne({ where: { id: dto.admin_id } });
    if (!admin) throw new BadRequestException('Invalid admin_id');

    const permission = await this.permissionRepo.findOne({
      where: { id: dto.permission_id },
    });
    if (!permission) throw new BadRequestException('Invalid permission_id');

    if (permission.guard !== 'admin') {
      throw new BadRequestException('Permission must be for admin guard only');
    }

    const record = this.adminPermissionRepo.create(dto);
    return await this.adminPermissionRepo.save(record);
  }

  async findAll() {
    return await this.adminPermissionRepo.find();
  }

  async findOne(id: number) {
    const record = await this.adminPermissionRepo.findOne({
      where: { id },
      relations: ['admin', 'permission'],
    });
    if (!record) throw new NotFoundException('Record not found');
    return record;
  }

  async update(id: number, dto: UpdateAdminPermissionDto) {
    const existing = await this.adminPermissionRepo.findOne({ where: { id } });
    if (!existing)
      throw new NotFoundException('Admin Permission Assignment not found');

    if (dto.admin_id) {
      const admin = await this.adminRepo.findOne({
        where: { id: dto.admin_id },
      });
      if (!admin) throw new BadRequestException('Invalid admin_id');
      existing.admin_id = dto.admin_id;
      existing.admin = admin;
    }

    if (dto.permission_id) {
      const permission = await this.permissionRepo.findOne({
        where: { id: dto.permission_id },
      });
      if (!permission) throw new BadRequestException('Invalid permission_id');

      if (permission.guard !== 'admin') {
        throw new BadRequestException(
          'Permission must be for admin guard only',
        );
      }

      existing.permission_id = dto.permission_id;
      existing.permission = permission;
    }

    await this.adminPermissionRepo.save(existing);
    return this.findOne(id);
  }

  async remove(id: number) {
    const record = await this.adminPermissionRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return await this.adminPermissionRepo.remove(record);
  }
}
