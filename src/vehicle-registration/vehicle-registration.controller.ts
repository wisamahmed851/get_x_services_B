import { Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VehicleRegistrationService } from './vehicle-registration.service';
// import { UpdateVehicleRegistrationDto } from './dto/update-vehicle-registration.dto';
import { CreateVehicleRegistrationDto } from './dtos/vehicle-registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/utils/multer.config';

@Controller('vehicle-registrations')
export class VehicleRegistrationController {
    constructor(private readonly vehicleService: VehicleRegistrationService) { }

    @Post('store')
    @UseInterceptors(
        FileInterceptor('image', multerConfig('uploads'))
    )
    create(
        @Body() dto: CreateVehicleRegistrationDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const image = file ? file.filename : null;
        if (!image) {
            throw new Error('Image file is required');
        }
        return this.vehicleService.create({ ...dto, image });
    }

    @Get()
    findAll() {
        return this.vehicleService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.vehicleService.findOne(id);
    // }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() dto: UpdateVehicleRegistrationDto) {
    //     return this.vehicleService.update(id, dto);
    //   }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehicleService.remove(id);
    }
}
