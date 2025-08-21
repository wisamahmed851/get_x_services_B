import { Role } from 'src/roles/entity/roles.entity';
import { Admin } from 'src/admin/entity/admin.entity';
export declare class AdminRole {
    id: number;
    admin_id: number;
    role_id: number;
    admin: Admin;
    role: Role;
    status: number;
    created_at: String;
    updated_at: String;
    setCreateDateParts(): void;
}
