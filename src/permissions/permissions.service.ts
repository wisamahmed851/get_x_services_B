// src/permissions/permissions.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

  async create(data: CreatePermissionDto) {
    const existingPermission = await this.permissionRepo.findOne({
      where: { name: data.name, guard: data.guard },
    });
    if (existingPermission)
      throw new BadRequestException('This name permission is already made');
    const permission = this.permissionRepo.create(data);
    return this.permissionRepo.save(permission);
  }

  async findAll() {
    const permission = await this.permissionRepo.find();
    if (!permission) throw new NotFoundException('Permission Is not Found');
    return {
      success: true,
      message: 'Permission is updated',
      data: permission,
    };
  }

  async findOne(id: number) {
    const permission = await this.permissionRepo.findOneBy({ id });
    if (!permission) throw new NotFoundException('Permission not found');
    return {
      success: true,
      message: 'Permission is updated',
      data: permission,
    };
  }

  async update(id: number, data: UpdatePermissionDto) {
    const existingPermission = await this.permissionRepo.findOne({
      where: {
        id: Not(id),
        name: data.name,
        guard: data.guard,
      },
    });
    if (existingPermission)
      throw new BadRequestException('This name permission is already made');
    const permission = await this.permissionRepo.findOne({ where: { id: id } });
    if (!permission) throw new NotFoundException('Permission Not Found');
    Object.assign(permission, data);
    const savedPermission = await this.permissionRepo.save(permission);
    return {
      success: true,
      message: 'Permission is updated',
      data: savedPermission,
    };
  }
  async toogleStatus(id: number) {
    const permission = await this.permissionRepo.findOne({ where: { id } });
    if (!permission) throw new NotFoundException('The permission is not found');
    permission.status = permission.status === 0 ? 1 : 0;
    const message =
      permission.status === 1
        ? 'Permission is Activated'
        : 'Permission is In Activated';
    const permissions = await this.permissionRepo.save(permission);
    return {
      success: true,
      message: message,
      data: permissions,
    };
  }
  async remove(id: number) {
    const found = await this.findOne(id);
    const permission = found.data;
    return this.permissionRepo.remove(permission);
  }
}
