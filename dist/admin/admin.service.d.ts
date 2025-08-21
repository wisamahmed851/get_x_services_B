import { Repository } from 'typeorm';
import { Admin } from './entity/admin.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
export declare class AdminsService {
    private readonly adminRepo;
    private readonly roleRepo;
    constructor(adminRepo: Repository<Admin>, roleRepo: Repository<Role>);
    create(dto: CreateAdminDto, image: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            name: string;
            email: string;
            image: string;
            status: number;
            created_at: String;
            updated_at: String;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            name: string;
            email: string;
            image: string;
            status: number;
            created_at: String;
            updated_at: String;
        }[];
    }>;
    allAvtive(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            name: string;
            email: string;
            image: string;
            status: number;
            created_at: String;
            updated_at: String;
        }[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            name: string;
            email: string;
            image: string;
            status: number;
            created_at: String;
            updated_at: String;
        };
    }>;
    update(id: number, dto: UpdateAdminDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            name: string;
            email: string;
            image: string;
            status: number;
            created_at: String;
            updated_at: String;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    }>;
    statusUpdate(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            name: string;
            email: string;
            image: string;
            status: number;
            created_at: String;
            updated_at: String;
        };
    }>;
    private handleUnknown;
}
