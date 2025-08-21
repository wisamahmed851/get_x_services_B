import { Permission } from 'src/permissions/entity/permission.entity';
import { Role } from 'src/roles/entity/roles.entity';
export declare class RolePermissions {
    id: number;
    role_id: number;
    role: Role;
    permission_id: number;
    permission: Permission;
    status: number;
    created_at: String;
    updated_at: String;
    setCreateDateParts(): void;
}
