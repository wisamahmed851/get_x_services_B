import { AdminPermissionsService } from './admin-permissions.service';
import { CreateAdminPermissionDto, UpdateAdminPermissionDto } from './dtos/admin-permission.dto';
export declare class AdminPermissionsController {
    private readonly adminPermissionsService;
    constructor(adminPermissionsService: AdminPermissionsService);
    create(dto: CreateAdminPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-permission.entity").AdminPermission;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-permission.entity").AdminPermission[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-permission.entity").AdminPermission;
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-permission.entity").AdminPermission;
    }>;
    update(id: number, dto: UpdateAdminPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/admin-permission.entity").AdminPermission | null;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
}
