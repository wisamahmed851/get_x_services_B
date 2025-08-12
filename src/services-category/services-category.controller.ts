import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ServicesCategoryService } from "./services-category.service";
import { ServicesCategoryDto } from "./dtos/services-category.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/common/utils/multer.config";

@Controller('services-category')
export class ServicesCategoryController {
    constructor(
        private servicesCategoryService: ServicesCategoryService
    ) { }

    @Post('store')
    @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
    async createCategory(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: ServicesCategoryDto
    ) {
        if (file) {
            data.image = file.filename; // Assign the filename to the DTO
        }
        return this.servicesCategoryService.createCategory(data);
    }
}