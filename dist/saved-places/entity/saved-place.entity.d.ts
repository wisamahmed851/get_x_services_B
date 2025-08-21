import { User } from 'src/users/entity/user.entity';
export declare class SavedPlace {
    id: number;
    user_id: number;
    user: User;
    name: string;
    longitude: string;
    latitude: string;
    address: string;
    status: number;
    created_by: number;
    created_at: string;
    updated_at: string;
    setCreateDateParts(): void;
}
