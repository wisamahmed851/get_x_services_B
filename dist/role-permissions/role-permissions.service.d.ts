import { Repository } from 'typeorm';
import { CreateRolePermissionAssigningDto, UpdateRolePermissionAssigningDto } from './dto/role-permission.dto';
import { RolePermissions } from './entity/role-permission.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { Permission } from 'src/permissions/entity/permission.entity';
export declare class RolePermissionsService {
    private readonly rolePermissionRepo;
    private readonly roleRepo;
    private readonly permissionRepo;
    constructor(rolePermissionRepo: Repository<RolePermissions>, roleRepo: Repository<Role>, permissionRepo: Repository<Permission>);
    create(dto: CreateRolePermissionAssigningDto): Promise<{
        success: boolean;
        message: string;
        data: RolePermissions;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: RolePermissions[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: RolePermissions;
    }>;
    update(id: number, dto: UpdateRolePermissionAssigningDto): Promise<RolePermissions | null>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: RolePermissions;
    }>;
    remove(id: number): Promise<RolePermissions>;
    private handleUnknown;
}
