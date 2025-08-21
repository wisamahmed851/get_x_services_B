import { ServicesCategoryService } from "./services-category.service";
export declare class ServicesCategoryProviderController {
    private readonly servicesCategoryService;
    constructor(servicesCategoryService: ServicesCategoryService);
    getAllCategories(limit?: number, offset?: number, page?: number): Promise<{
        success: boolean;
        message: string;
        total: number;
        limit: number;
        offset: number;
        data: import("./entity/services-category.entity").ServicesCategory[];
    } | {
        success: boolean;
        message: string;
        data: import("./entity/services-category.entity").ServicesCategory[];
        total?: undefined;
        limit?: undefined;
        offset?: undefined;
    }>;
}
