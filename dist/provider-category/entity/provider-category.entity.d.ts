import { ServicesCategory } from 'src/services-category/entity/services-category.entity';
import { User } from 'src/users/entity/user.entity';
export declare class ProviderCategory {
    id: number;
    provider_id: number;
    provider: User;
    category_id: number;
    servicescategory: ServicesCategory;
}
