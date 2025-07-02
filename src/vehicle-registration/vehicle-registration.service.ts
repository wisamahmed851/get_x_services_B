import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleRegistration } from './entity/vehicle-registration.entity';
import { Repository } from 'typeorm';
import { CreateVehicleRegistrationDto, UpdateVehicleRegistrationDto } from './dtos/vehicle-registration.dto';
import { UserVehicle } from './entity/user-vehicle.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class VehicleRegistrationService {
    constructor(
        @InjectRepository(VehicleRegistration)
        private vehicleRepo: Repository<VehicleRegistration>,

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(UserVehicle)
        private userVehicleRepo: Repository<UserVehicle>,
    ) { }

    async create(dto: CreateVehicleRegistrationDto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        if (!user) throw new NotFoundException('User not found');

        const { userId, ...vehicleData } = dto;

        const vehicle = this.vehicleRepo.create(vehicleData);
        const savedVehicle = await this.vehicleRepo.save(vehicle);

        const userVehicle = this.userVehicleRepo.create({
            user,
            vehicle: savedVehicle,
        });
        await this.userVehicleRepo.save(userVehicle);

        return savedVehicle;
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

        if (!dto.image) {
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

    async softDelete(id: number): Promise<{ messege: string; vehicle: VehicleRegistration }> {
        const vehicle = await this.vehicleRepo.findOneBy({ id });
        if (!vehicle) {
            throw new NotFoundException('Vehicle not found');
        }

        vehicle.status = 0; // Mark as inactive
        vehicle.updated_at = new Date().toISOString().split('T')[0];

        const xyz = await this.vehicleRepo.save(vehicle);

        return {
            messege: 'vehicle has been inactive',
            vehicle: xyz,
        };
    }

    // Get only active vehicles
    async findActive(): Promise<VehicleRegistration[]> {
        return this.vehicleRepo.find({ where: { status: 0 } });
    }

}
