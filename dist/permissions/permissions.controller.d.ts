import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos/permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/permission.entity").Permission;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/permission.entity").Permission[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/permission.entity").Permission;
    }>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/permission.entity").Permission;
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/permission.entity").Permission;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/permission.entity").Permission;
    }>;
}
