import { Repository } from 'typeorm';
import { Permission } from './entity/permission.entity';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos/permission.dto';
export declare class PermissionsService {
    private permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    create(data: CreatePermissionDto): Promise<{
        success: boolean;
        message: string;
        data: Permission;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: Permission[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: Permission;
    }>;
    update(id: number, data: UpdatePermissionDto): Promise<{
        success: boolean;
        message: string;
        data: Permission;
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: Permission;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: Permission;
    }>;
    private handleUnknown;
}
