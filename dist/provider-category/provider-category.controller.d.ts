import { ProviderCategoryService } from "./provider-category.service";
import { AssignCategoriesDto } from "./dtos/provider-category.dto";
export declare class ProviderCategoryController {
    private readonly providerCategoryService;
    constructor(providerCategoryService: ProviderCategoryService);
    assignCategories(providerId: number, dto: AssignCategoriesDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/provider-category.entity").ProviderCategory[];
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    getProviderCategories(providerId: number): Promise<{
        success: boolean;
        message: string;
        data: import("../services-category/entity/services-category.entity").ServicesCategory[];
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    getProvidersByCategory(categoryId: number): Promise<{
        success: boolean;
        message: string;
        data: import("../users/entity/user.entity").User[];
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
}
