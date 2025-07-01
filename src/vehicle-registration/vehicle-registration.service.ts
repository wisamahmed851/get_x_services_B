import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleRegistration } from './entity/vehicle-registration.entity';
import { Repository } from 'typeorm';
import { CreateVehicleRegistrationDto, UpdateVehicleRegistrationDto } from './dtos/vehicle-registration.dto';

@Injectable()
export class VehicleRegistrationService {
    constructor(
        @InjectRepository(VehicleRegistration)
        private vehicleRepo: Repository<VehicleRegistration>,
    ) { }

    async create(dto: CreateVehicleRegistrationDto) {
        const vehicle = this.vehicleRepo.create(dto);
        return await this.vehicleRepo.save(vehicle);
    }

    async findOne(id: number): Promise<VehicleRegistration> {
        const vehicle = await this.vehicleRepo.findOne({ where: { id } });
        if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);
        return vehicle;
    }

    async findAll(): Promise<VehicleRegistration[]> {
        return this.vehicleRepo.find();
    }


    async update(
        id: number,
        dto: UpdateVehicleRegistrationDto,
    ) {
        const vehicle = await this.findOne(id); // will throw if not found

        if(!dto.image){
            dto.image = vehicle.image;
        }
        // Only update fields if they exist in the dto
        Object.assign(vehicle, dto);

        // Save the updated vehicle
        return this.vehicleRepo.save(vehicle);
    }

    async remove(id: string): Promise<void> {
        const result = await this.vehicleRepo.delete(id);
        if (result.affected === 0)
            throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

     async softDelete(id: number): Promise<string> {
    const vehicle = await this.vehicleRepo.findOneBy({ id });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    vehicle.status = 0; // Mark as inactive
    vehicle.updated_at = new Date().toISOString().split('T')[0];

    await this.vehicleRepo.save(vehicle);

    return `Vehicle with ID ${id} marked as inactive`;
  }

  // Get only active vehicles
  async findActive(): Promise<VehicleRegistration[]> {
    return this.vehicleRepo.find({ where: { status: 0 } });
  }

}
