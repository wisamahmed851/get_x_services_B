import { AdminRolesService } from './admin-roles.service';
import { CreateAdminRoleDto, UpdateAdminRoleDto } from './dtos/admin-role.dto';
export declare class AdminRolesController {
    private readonly service;
    constructor(service: AdminRolesService);
    create(dto: CreateAdminRoleDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-role.entity").AdminRole | null;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-role.entity").AdminRole[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-role.entity").AdminRole;
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-role.entity").AdminRole;
    }>;
    update(id: number, dto: UpdateAdminRoleDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-role.entity").AdminRole;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
}
