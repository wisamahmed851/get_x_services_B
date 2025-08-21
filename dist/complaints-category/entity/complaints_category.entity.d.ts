import { Admin } from "src/admin/entity/admin.entity";
export declare class complaintsCaterory {
    id: number;
    name: string;
    icon: string;
    status: number;
    created_at: String;
    updated_at: String;
    created_by: number;
    setCreateDateParts(): void;
    admin: Admin;
}
