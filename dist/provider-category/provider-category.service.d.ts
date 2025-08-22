import { Repository } from "typeorm";
import { ProviderCategory } from "./entity/provider-category.entity";
import { User } from "src/users/entity/user.entity";
import { ServicesCategory } from "src/services-category/entity/services-category.entity";
import { AssignCategoriesDto } from "./dtos/provider-category.dto";
export declare class ProviderCategoryService {
    private providerCategoryRepository;
    private userRepository;
    private categoryRepository;
    constructor(providerCategoryRepository: Repository<ProviderCategory>, userRepository: Repository<User>, categoryRepository: Repository<ServicesCategory>);
    private handleUnknown;
    assignCategories(providerId: number, dto: AssignCategoriesDto): Promise<{
        success: boolean;
        message: string;
        data: never[];
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    getProviderCategories(providerId: number): Promise<{
        success: boolean;
        message: string;
        data: ServicesCategory[];
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    getProvidersByCategory(categoryId: number): Promise<{
        success: boolean;
        message: string;
        data: User[];
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
}
