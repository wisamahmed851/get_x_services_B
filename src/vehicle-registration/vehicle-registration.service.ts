import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleRegistration } from './entity/vehicle-registration.entity';
import { Repository } from 'typeorm';
import { CreateVehicleRegistrationDto } from './dtos/vehicle-registration.dto';

@Injectable()
export class VehicleRegistrationService {
  constructor(
    @InjectRepository(VehicleRegistration)
    private vehicleRepo: Repository<VehicleRegistration>,
  ) {}

  async create(dto: CreateVehicleRegistrationDto) {
    const vehicle = this.vehicleRepo.create(dto);
    return await this.vehicleRepo.save(vehicle);
  }

  async findAll(): Promise<VehicleRegistration[]> {
    return this.vehicleRepo.find();
  }

  // async findOne(id: string): Promise<VehicleRegistration> {
  //     const vehicle = await this.vehicleRepo.findOne({ where: { id } });
  //     if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);
  //     return vehicle;
  // }

  // async update(id: string, dto: UpdateVehicleRegistrationDto): Promise<VehicleRegistration> {
  //     const vehicle = await this.findOne(id);
  //     Object.assign(vehicle, dto);
  //     vehicle.updated_at = new Date().toISOString().split('T')[0]; // Update the date
  //     return this.vehicleRepo.save(vehicle);
  // }

  async remove(id: string): Promise<void> {
    const result = await this.vehicleRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
  }
}
