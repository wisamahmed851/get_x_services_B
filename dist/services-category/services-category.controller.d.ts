import { ServicesCategoryService } from "./services-category.service";
import { ServicesCategoryDto } from "./dtos/services-category.dto";
export declare class ServicesCategoryController {
    private readonly servicesCategoryService;
    constructor(servicesCategoryService: ServicesCategoryService);
    createCategory(file: Express.Multer.File, data: ServicesCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/services-category.entity").ServicesCategory;
    }>;
    getAllCategories(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/services-category.entity").ServicesCategory[];
    }>;
    getCategoryById(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/services-category.entity").ServicesCategory;
    }>;
    updateCategory(id: number, file: Express.Multer.File, data: Partial<ServicesCategoryDto>): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/services-category.entity").ServicesCategory;
    }>;
    toggleCategoryStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/services-category.entity").ServicesCategory;
    }>;
}
