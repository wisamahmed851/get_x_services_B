import { Repository } from 'typeorm';
import { UserPermission } from './entity/user-permission.entity';
import { CreateUserPermissionDto, UpdateUserPermissionDto } from './dtos/user-permission.dto';
import { User } from 'src/users/entity/user.entity';
import { Permission } from 'src/permissions/entity/permission.entity';
export declare class UserPermissionsService {
    private readonly userPermissionRepo;
    private readonly userRepo;
    private readonly permissionRepo;
    constructor(userPermissionRepo: Repository<UserPermission>, userRepo: Repository<User>, permissionRepo: Repository<Permission>);
    create(dto: CreateUserPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: UserPermission;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: UserPermission[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: UserPermission;
    }>;
    update(id: number, dto: UpdateUserPermissionDto): Promise<{
        success: boolean;
        message: string;
        data: UserPermission | null;
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: UserPermission;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
    private handleUnknown;
}
