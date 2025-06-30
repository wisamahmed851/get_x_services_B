import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { VehicleRegistrationService } from './vehicle-registration.service';
import { UpdateVehicleRegistrationDto } from './dto/update-vehicle-registration.dto';
import { CreateVehicleRegistrationDto } from './dtos/vehicle-registration.dto';

@Controller('vehicle-registrations')
export class VehicleRegistrationController {
  constructor(private readonly vehicleService: VehicleRegistrationService) {}

  @Post('Store')
  create(@Body() dto: CreateVehicleRegistrationDto) {
    return this.vehicleService.create(dto);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVehicleRegistrationDto) {
    return this.vehicleService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
