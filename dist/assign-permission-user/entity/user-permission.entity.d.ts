import { User } from 'src/users/entity/user.entity';
import { Permission } from 'src/permissions/entity/permission.entity';
export declare class UserPermission {
    id: number;
    user_id: number;
    user: User;
    permission_id: number;
    permission: Permission;
    status: number;
    created_at: string;
    updated_at: string;
    setCreateDateParts(): void;
}
