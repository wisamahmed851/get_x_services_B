import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dtos/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async create(role: CreateRoleDto) {
    if (role.guard !== 'user' && role.guard !== 'admin') {
      throw new BadRequestException(
        'Guard will be user or admin not anything else',
      );
    }
    const roleCreate = this.roleRepo.create(role);
    const Role = await this.roleRepo.save(roleCreate);
    return {
      message: 'Role Has Been Create',
      role: Role,
    };
  }

  async index() {
    return await this.roleRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id: id },
    });
    if (!role) throw new NotFoundException('Role Not Found');

    return role;
  }

  async update(role: UpdateRoleDto, id: number) {
    if (role.guard !== 'user' && role.guard !== 'admin') {
      throw new BadRequestException(
        'Guard will be user or admin not anything else',
      );
    }
    const existing = await this.roleRepo.findOne({
      where: { id: id },
    });

    if (!existing) throw new NotFoundException('Role Not Found');
    const existingName = await this.roleRepo.findOne({
      where: { name: role.name },
    });

    if (existingName)
      throw new BadRequestException('This role is already made');

    Object.assign(existing, role);
    return await this.roleRepo.save(existing);
  }
}
