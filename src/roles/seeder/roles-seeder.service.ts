// src/roles/seeder/roles-seeder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entity/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    const defaultRoles = ['user', 'provider', 'admin'];

    for (const name of defaultRoles) {
      const exists = await this.roleRepository.findOne({ where: { name } });
      if (!exists) {
        const role = this.roleRepository.create({ name });
        await this.roleRepository.save(role);
        Logger.log(`✅ Seeded role: ${name}`, 'RolesSeederService');
      } else {
        Logger.log(`ℹ️ Role already exists: ${name}`, 'RolesSeederService');
      }
    }
  }
}
