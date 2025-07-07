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
    const existingroles = await this.roleRepo.findOne({
      where: { name: role.name, guard: role.guard },
    });
    if (existingroles)
      throw new BadRequestException('Tis Role Already in this guard');
    const roleCreate = this.roleRepo.create(role);
    const Role = await this.roleRepo.save(roleCreate);
    return {
      success: true,
      message: 'Role Has Been Create',
      role: Role,
    };
  }

  async index() {
    const role = await this.roleRepo.find({ order: { id: 'ASC' } });
    return {
      success: true,
      message: 'Role Is Fetched',
      data: role,
    };
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id: id },
    });
    if (!role) throw new NotFoundException('Role Not Found');

    return {
      success: true,
      message: 'Role Is Fetched',
      data: role,
    };
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

  async toogleStatus(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id: id },
    });
    if (!role) throw new NotFoundException('Role Not Found');
    role.status = role.status === 0 ? 1 : 0;
    const userMessage =
      role.status === 1
        ? 'User Has Been Activated Successfully'
        : 'User Has Beeen Deactivated Successfully';
    const SavedRoles = await this.roleRepo.save(role);
    return {
      success: true,
      message: 'Role Is Fetched',
      data: SavedRoles,
    };
  }
}
