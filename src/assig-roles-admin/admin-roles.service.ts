import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entity/roles.entity';
import { AdminRole } from './entity/admin-role.entity';
import { CreateAdminRoleDto, UpdateAdminRoleDto } from './dtos/admin-role.dto';
import { Admin } from 'src/admin/entity/admin.entity';

@Injectable()
export class AdminRolesService {
  constructor(
    @InjectRepository(AdminRole)
    private readonly adminRoleRepo: Repository<AdminRole>,

    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateAdminRoleDto) {
    const admin = await this.adminRepo.findOne({ where: { id: dto.admin_id } });
    if (!admin) throw new BadRequestException('Invalid admin_id');

    const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
    if (!role) throw new BadRequestException('Invalid role_id');

    if (role.guard !== 'admin') {
      throw new BadRequestException('Role must be for admin guard only');
    }

    const record = this.adminRoleRepo.create(dto);
    return await this.adminRoleRepo.save(record);
  }

  async findAll() {
    return await this.adminRoleRepo.find({ relations: ['admin', 'role'] });
  }

  async findOne(id: number) {
    const record = await this.adminRoleRepo.findOne({
      where: { id },
      relations: ['admin', 'role'],
    });
    if (!record) throw new NotFoundException('Record not found');
    return record;
  }

  async update(id: number, dto: UpdateAdminRoleDto) {
    const existing = await this.adminRoleRepo.findOne({ where: { id } });
    if (!existing)
      throw new NotFoundException('Admin Role Assignment not found');

    if (dto.admin_id) {
      const admin = await this.adminRepo.findOne({
        where: { id: dto.admin_id },
      });
      if (!admin) throw new BadRequestException('Invalid admin_id');
      existing.admin_id = dto.admin_id;
      existing.admin = admin;
    }

    if (dto.role_id) {
      const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
      if (!role) throw new BadRequestException('Invalid role_id');
      if (role.guard !== 'admin') {
        throw new BadRequestException('Role must be for admin guard only');
      }
      existing.role_id = dto.role_id;
      existing.role = role;
    }

    await this.adminRoleRepo.save(existing);
    return this.findOne(id); // Return full with relations
  }

  async remove(id: number) {
    const record = await this.adminRoleRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return await this.adminRoleRepo.remove(record);
  }
}
