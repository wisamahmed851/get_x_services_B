import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { VehicleRegistrationService } from './vehicle-registration.service';
import { CreateVehicleRegistrationDto, UpdateVehicleRegistrationDto } from './dtos/vehicle-registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/utils/multer.config';

@Controller('vehicle-registrations')
export class VehicleRegistrationController {
    constructor(private readonly vehicleService: VehicleRegistrationService) { }

    @Post('store')
    @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
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

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.vehicleService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
    update(
        @Param('id') id: number,
        @Body() dto: UpdateVehicleRegistrationDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const image = file?.filename;

        return this.vehicleService.update(id, { ...dto, image });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehicleService.remove(id);
    }
}
