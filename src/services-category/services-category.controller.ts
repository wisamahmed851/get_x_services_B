import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
    ParseIntPipe,
    UseGuards
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/common/utils/multer.config";
import { ServicesCategoryService } from "./services-category.service";
import { ServicesCategoryDto } from "./dtos/services-category.dto";
import { AdminJwtAuthGuard } from "src/auth/admin/admin-jwt.guard";

@Controller('admin/services-category')
@UseGuards(AdminJwtAuthGuard)
export class ServicesCategoryController {
    constructor(
        private readonly servicesCategoryService: ServicesCategoryService
    ) { }

    /* ─────────────────────────────── CREATE ─────────────────────────────── */
    @Post('store')
    @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
    async createCategory(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: ServicesCategoryDto
    ) {
        if (file) {
            data.image = file.filename;
        }
        return this.servicesCategoryService.createCategory(data);
    }

    /* ─────────────────────────────── GET ALL ─────────────────────────────── */
    @Get("index")
    async getAllCategories() {
        return this.servicesCategoryService.findAll();
    }

    /* ─────────────────────────────── GET ONE ─────────────────────────────── */
    @Get('findOne/:id')
    async getCategoryById(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.servicesCategoryService.findOneById(id);
    }

    /* ─────────────────────────────── UPDATE ─────────────────────────────── */
    @Patch('update/:id')
    @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: Partial<ServicesCategoryDto>
    ) {
        if (file) {
            data.image = file.filename;
        }
        return this.servicesCategoryService.updateCategory(id, data);
    }

    /* ─────────────────────────────── TOGGLE STATUS ─────────────────────────────── */
    @Patch('toggle-status/:id')
    async toggleCategoryStatus(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.servicesCategoryService.toggleStatus(id);
    }
}
