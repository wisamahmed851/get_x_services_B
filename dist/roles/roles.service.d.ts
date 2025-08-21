import { Role } from './entity/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dtos/role.dto';
export declare class RolesService {
    private roleRepo;
    constructor(roleRepo: Repository<Role>);
    private handleUnknown;
    create(role: CreateRoleDto): Promise<{
        success: boolean;
        message: string;
        data: Role;
    }>;
    index(): Promise<{
        success: boolean;
        message: string;
        data: Role[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: Role;
    }>;
    update(role: UpdateRoleDto, id: number): Promise<{
        success: boolean;
        message: string;
        data: Role;
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: Role;
    }>;
}
