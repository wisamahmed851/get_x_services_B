import { Role } from 'src/roles/entity/roles.entity';
import { User } from 'src/users/entity/user.entity';
export declare class UserRole {
    id: number;
    user_id: number;
    role_id: number;
    user: User;
    role: Role;
    status: number;
    created_at: String;
    updated_at: String;
    setCreateDateParts(): void;
}
