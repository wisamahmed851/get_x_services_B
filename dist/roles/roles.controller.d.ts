import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dtos/role.dto';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    create(data: CreateRoleDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/roles.entity").Role;
    }>;
    index(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/roles.entity").Role[];
    }>;
    show(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/roles.entity").Role;
    }>;
    update(id: number, data: UpdateRoleDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/roles.entity").Role;
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/roles.entity").Role;
    }>;
}
