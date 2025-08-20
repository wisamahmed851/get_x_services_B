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
    UseGuards,
    Query
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/common/utils/multer.config";
import { ServicesCategoryService } from "./services-category.service";
import { ServicesCategoryDto } from "./dtos/services-category.dto";
import { AdminJwtAuthGuard } from "src/auth/admin/admin-jwt.guard";
import { UserJwtAuthGuard } from "src/auth/user/user-jwt.guard";
import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap";

@Controller('user/services-category')
export class ServicesCategoryProviderController {
    constructor(
        private readonly servicesCategoryService: ServicesCategoryService
    ) { }


    /* ─────────────────────────────── GET ALL ─────────────────────────────── */
    @Get("index")
    async getAllCategories(
        @Query("limit") limit?: number,
        @Query("offset") offset?: number,
        @Query("page") page?: number
    ) {
        return this.servicesCategoryService.findAllForList(limit, offset, page);
    }
}
