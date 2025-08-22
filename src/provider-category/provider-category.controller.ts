import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProviderCategoryService } from "./provider-category.service";
import { AssignCategoriesDto } from "./dtos/provider-category.dto";
import { UserJwtAuthGuard } from "src/auth/user/user-jwt.guard";
import { Role } from "src/roles/entity/roles.entity";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller("provider-category")
@UseGuards(UserJwtAuthGuard, RolesGuard)
export class ProviderCategoryController {
    constructor(private readonly providerCategoryService: ProviderCategoryService) { }

    // Provider assigns categories
    // @Roles('provider')
    @Post("/assign")
    async assignCategories(
        @CurrentUser('id') providerId: number,
        @Body() dto: AssignCategoriesDto
    ) {
        return this.providerCategoryService.assignCategories(providerId, dto);
    }

    // Get categories for a provider
    @Get(":providerId/categories")
    async getProviderCategories(@Param("providerId") providerId: number) {
        return this.providerCategoryService.getProviderCategories(providerId);
    }

    // Get providers for a category
    @Get("category/:categoryId/providers")
    async getProvidersByCategory(@Param("categoryId") categoryId: number) {
        return this.providerCategoryService.getProvidersByCategory(categoryId);
    }
}
