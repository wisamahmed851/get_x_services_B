import { Admin } from "src/admin/entity/admin.entity";
import { User } from "src/users/entity/user.entity";
export declare class City {
    id: number;
    name: string;
    created_by: number;
    admin: Admin;
    users: User[];
    created_at: string;
    updated_at: string;
    setCreateDateParts(): void;
}
