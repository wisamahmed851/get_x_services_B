import { Admin } from 'src/admin/entity/admin.entity';
import { Permission } from 'src/permissions/entity/permission.entity';
export declare class AdminPermission {
    id: number;
    admin_id: number;
    admin: Admin;
    permission_id: number;
    permission: Permission;
    status: number;
    created_at: string;
    updated_at: string;
    setCreateDateParts(): void;
}
