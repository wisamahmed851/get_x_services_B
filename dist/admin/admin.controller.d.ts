import { AdminsService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
export declare class AdminsController {
    private readonly adminsService;
    constructor(adminsService: AdminsService);
    create(dto: CreateAdminDto, file: Express.Multer.File): Promise<{
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
    update(id: number, dto: UpdateAdminDto, file: Express.Multer.File): Promise<{
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
    statusChange(id: number): Promise<{
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
}
