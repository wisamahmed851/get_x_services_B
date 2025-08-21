import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/entity/admin.entity';
import { Repository } from 'typeorm';
export declare class AdminAuthService {
    private adminRepo;
    private jwtSerrvice;
    constructor(adminRepo: Repository<Admin>, jwtSerrvice: JwtService);
    validateEmail(email: string, password: string): Promise<Admin>;
    login(admin: Admin): Promise<{
        success: boolean;
        message: string;
        access_token: string;
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
    getProfile(admin: Admin): Promise<{
        success: boolean;
        message: string;
        data: Admin;
    }>;
    passwordChange(body: {
        oldPassword: string;
        newPassword: string;
    }, admin: any): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
    logout(admin: Admin): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
    private handleUnknown;
}
