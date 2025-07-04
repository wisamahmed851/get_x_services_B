import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entity/roles.entity';
import { CreateUserRoleDto, UpdateUserRoleDto } from './dtos/user-role.dto';
import { User } from 'src/users/entity/user.entity';
import { UserRole } from './entity/user-role.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateUserRoleDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new BadRequestException('Invalid user_id');

    const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
    if (!role) throw new BadRequestException('Invalid role_id');

    if (role.guard !== 'user') {
      throw new BadRequestException('Role must be for user guard only');
    }

    const record = this.userRoleRepo.create(dto);
    return await this.userRoleRepo.save(record);
  }

  async findAll() {
    return await this.userRoleRepo.find({ relations: ['user', 'role'] });
  }

  async findOne(id: number) {
    const record = await this.userRoleRepo.findOne({
      where: { id },
      relations: ['user', 'role'],
    });
    if (!record) throw new NotFoundException('Record not found');
    return record;
  }

  async update(id: number, dto: UpdateUserRoleDto) {
    const existing = await this.userRoleRepo.findOne({ where: { id } });
    if (!existing)
      throw new NotFoundException('User Role Assignment not found');

    if (dto.user_id) {
      const user = await this.userRepo.findOne({
        where: { id: dto.user_id },
      });
      if (!user) throw new BadRequestException('Invalid user_id');
      existing.user_id = dto.user_id;
      existing.user = user;
    }

    if (dto.role_id) {
      const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
      if (!role) throw new BadRequestException('Invalid role_id');
      if (role.guard !== 'user') {
        throw new BadRequestException('Role must be for user guard only');
      }
      existing.role_id = dto.role_id;
      existing.role = role;
    }

    await this.userRoleRepo.save(existing);
    return this.findOne(id); // Return full with relations
  }

  async remove(id: number) {
    const record = await this.userRoleRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return await this.userRoleRepo.remove(record);
  }
}
