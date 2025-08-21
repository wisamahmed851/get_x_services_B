import { Repository } from 'typeorm';
import { AdminPermission } from './entity/admin-permission.entity';
import { CreateAdminPermissionDto, UpdateAdminPermissionDto } from './dtos/admin-permission.dto';
import { Admin } from 'src/admin/entity/admin.entity';
import { Permission } from 'src/permissions/entity/permission.entity';
export declare class AdminPermissionsService {
    private readonly adminPermissionRepo;
    private readonly adminRepo;
    private readonly permissionRepo;
    constructor(adminPermissionRepo: Repository<AdminPermission>, adminRepo: Repository<Admin>, permissionRepo: Repository<Permission>);
    create(dto: CreateAdminPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: AdminPermission;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: AdminPermission[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: AdminPermission;
    }>;
    update(id: number, dto: UpdateAdminPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: AdminPermission | null;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: AdminPermission;
    }>;
    private handleUnknown;
}
