import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionAssigningDto, UpdateRolePermissionAssigningDto } from './dto/role-permission.dto';
export declare class RolePermissionsController {
    private readonly service;
    constructor(service: RolePermissionsService);
    create(dto: CreateRolePermissionAssigningDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/role-permission.entity").RolePermissions;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/role-permission.entity").RolePermissions[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/role-permission.entity").RolePermissions;
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/role-permission.entity").RolePermissions;
    }>;
    update(id: number, dto: UpdateRolePermissionAssigningDto): Promise<import("./entity/role-permission.entity").RolePermissions | null>;
    remove(id: number): Promise<import("./entity/role-permission.entity").RolePermissions>;
}
