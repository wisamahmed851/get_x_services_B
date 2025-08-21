import { UserPermissionsService } from './user-permissions.service';
import { CreateUserPermissionDto, UpdateUserPermissionDto } from './dtos/user-permission.dto';
export declare class UserPermissionsController {
    private readonly userPermissionsService;
    constructor(userPermissionsService: UserPermissionsService);
    create(dto: CreateUserPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-permission.entity").UserPermission;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-permission.entity").UserPermission[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-permission.entity").UserPermission;
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-permission.entity").UserPermission;
    }>;
    update(id: number, dto: UpdateUserPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-permission.entity").UserPermission | null;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
}
