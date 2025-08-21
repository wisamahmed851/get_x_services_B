import { Repository } from 'typeorm';
import { Role } from 'src/roles/entity/roles.entity';
import { AdminRole } from './entity/admin-role.entity';
import { CreateAdminRoleDto, UpdateAdminRoleDto } from './dtos/admin-role.dto';
import { Admin } from 'src/admin/entity/admin.entity';
export declare class AdminRolesService {
    private readonly adminRoleRepo;
    private readonly adminRepo;
    private readonly roleRepo;
    constructor(adminRoleRepo: Repository<AdminRole>, adminRepo: Repository<Admin>, roleRepo: Repository<Role>);
    create(dto: CreateAdminRoleDto): Promise<{
        success: boolean;
        message: string;
        data: AdminRole | null;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: AdminRole[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: AdminRole;
    }>;
    update(id: number, dto: UpdateAdminRoleDto): Promise<{
        success: boolean;
        message: string;
        data: AdminRole;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: AdminRole;
    }>;
    private handleUnknown;
}
