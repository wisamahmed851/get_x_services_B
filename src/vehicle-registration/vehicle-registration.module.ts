import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRegistration } from './entity/vehicle-registration.entity';
import { VehicleRegistrationController } from './vehicle-registration.controller';
import { VehicleRegistrationService } from './vehicle-registration.service';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleRegistration])],
    controllers: [VehicleRegistrationController],
    providers: [VehicleRegistrationService],
    exports: [VehicleRegistrationService]
})
export class VehicleRegistrationModule {}
