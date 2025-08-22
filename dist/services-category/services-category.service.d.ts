import { Repository } from "typeorm";
import { ServicesCategory } from "./entity/services-category.entity";
import { ServicesCategoryDto } from "./dtos/services-category.dto";
export declare class ServicesCategoryService {
    private servicesCategoryRepository;
    constructor(servicesCategoryRepository: Repository<ServicesCategory>);
    private handleUnknown;
    private isEmptyArray;
    private isEmptyObject;
    createCategory(data: ServicesCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: ServicesCategory;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: ServicesCategory[];
    }>;
    findOneById(id: number): Promise<{
        success: boolean;
        message: string;
        data: ServicesCategory;
    }>;
    updateCategory(id: number, data: Partial<ServicesCategoryDto>): Promise<{
        success: boolean;
        message: string;
        data: ServicesCategory;
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: ServicesCategory;
    }>;
    findAllForList(limit?: number, offset?: number, page?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            total: number;
            limit: number;
            offset: number;
            categories: ServicesCategory[];
        };
    } | {
        success: boolean;
        message: string;
        data: ServicesCategory[];
    }>;
}
