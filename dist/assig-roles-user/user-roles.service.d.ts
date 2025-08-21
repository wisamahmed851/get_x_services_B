import { Repository } from 'typeorm';
import { Role } from 'src/roles/entity/roles.entity';
import { User } from 'src/users/entity/user.entity';
import { UserRole } from './entity/user-role.entity';
import { CreateUserRoleDto, UpdateUserRoleDto } from './dtos/user-role.dto';
export declare class UserRolesService {
    private readonly userRoleRepo;
    private readonly userRepo;
    private readonly roleRepo;
    constructor(userRoleRepo: Repository<UserRole>, userRepo: Repository<User>, roleRepo: Repository<Role>);
    create(dto: CreateUserRoleDto): Promise<{
        success: boolean;
        message: string;
        data: UserRole | null;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: UserRole[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: UserRole;
    }>;
    update(id: number, dto: UpdateUserRoleDto): Promise<{
        success: boolean;
        message: string;
        data: UserRole;
    }>;
    toggleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: UserRole;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
    private handleUnknown;
}
