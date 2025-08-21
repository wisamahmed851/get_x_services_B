import { Repository } from 'typeorm';
import { complaintsCaterory } from './entity/complaints_category.entity';
import { UpdateComplainCategoryDto } from './dto/complain-category.dto';
export declare class ComplaintsCategoryService {
    private categoryRepo;
    constructor(categoryRepo: Repository<complaintsCaterory>);
    create(body: any, userId: any): Promise<{
        success: boolean;
        message: string;
        data: complaintsCaterory;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: complaintsCaterory[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: complaintsCaterory;
    }>;
    update(id: number, dto: UpdateComplainCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: complaintsCaterory;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
        data: complaintsCaterory;
    }>;
}
