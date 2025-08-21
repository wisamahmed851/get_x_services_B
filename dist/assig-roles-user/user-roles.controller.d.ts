import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto, UpdateUserRoleDto } from './dtos/user-role.dto';
export declare class UserRolesController {
    private readonly userRolesService;
    constructor(userRolesService: UserRolesService);
    create(dto: CreateUserRoleDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-role.entity").UserRole | null;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-role.entity").UserRole[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-role.entity").UserRole;
    }>;
    update(id: number, dto: UpdateUserRoleDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-role.entity").UserRole;
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user-role.entity").UserRole;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
}
