import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entity/roles.entity';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateAdminDto, image: string) {
    if (dto.role_id == null) dto.role_id = 3;
    const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
    if (!role) throw new NotFoundException('Role not found');

    const existing = await this.adminRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('User With This Email Already Exists');
    }
    if (dto.password) {
      const saltRounds = 10;
      dto.password = await bcrypt.hash(dto.password, saltRounds);
    }
    if (dto.image == null) dto.image = image;

    const admin = this.adminRepo.create(dto);
    const savedAdmin = await this.adminRepo.save(admin);
    return {
      message: 'Admin has Been Created',
      amdin: savedAdmin,
    };
  }

  findAll() {
    return this.adminRepo.find({ relations: ['role'] });
  }
  allAvtive() {
    return this.adminRepo.find({
      relations: ['role'],
      where: { status: 1 },
    });
  }

  findOne(id: number) {
    return this.adminRepo.findOne({ where: { id }, relations: ['role'] });
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    if (!admin) throw new NotFoundException('Admin not found');
    if (admin.email == dto.email) {
      throw new BadRequestException('User With This Email Already Exists');
    }
    if (dto.role_id) {
      const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
      if (!role) throw new NotFoundException('Role not found');
      admin.role = role;
    }
    if (dto.password) {
      const saltRounds = 10;
      dto.password = await bcrypt.hash(dto.password, saltRounds);
    }
    if (!dto.image) {
      dto.image = admin.image;
    }
    Object.assign(admin, dto);
    return this.adminRepo.save(admin);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    if (!admin) throw new BadRequestException('Admin Not Found');
    return this.adminRepo.remove(admin);
  }

  async statusUpdate(id: number) {
    const user = await this.adminRepo.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('The user is not found');
    }

    user.status = user.status === 0 ? 1 : 0;

    const updatedUser = await this.adminRepo.save(user);

    const userMessage =
      updatedUser.status === 1
        ? 'User Has Been Activated Successfully'
        : 'User Has Beeen Deactivated Successfully';

    return {
      message: userMessage,
      user: updatedUser,
    };
  }
}
