import { ComplaintsCategoryService } from './complaints-category.service';
import { CreateComplainCategoryDto, UpdateComplainCategoryDto } from './dto/complain-category.dto';
export declare class ComplaintsCategoryController {
    private readonly service;
    constructor(service: ComplaintsCategoryService);
    store(body: CreateComplainCategoryDto, file: Express.Multer.File, userId: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/complaints_category.entity").complaintsCaterory;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/complaints_category.entity").complaintsCaterory[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/complaints_category.entity").complaintsCaterory;
    }>;
    update(id: number, dto: UpdateComplainCategoryDto, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/complaints_category.entity").complaintsCaterory;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/complaints_category.entity").complaintsCaterory;
    }>;
}
