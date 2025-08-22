import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProviderCategoryService } from "./provider-category.service";
import { AssignCategoriesDto } from "./dtos/provider-category.dto";

@Controller("provider-category")
export class ProviderCategoryController {
    constructor(private readonly providerCategoryService: ProviderCategoryService) { }

    // Provider assigns categories
    @Post(":providerId/assign")
    async assignCategories(
        @Param("providerId") providerId: number,
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
