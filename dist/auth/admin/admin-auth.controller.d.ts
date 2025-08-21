import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { Admin } from 'src/admin/entity/admin.entity';
export declare class AdminAuthController {
    private adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    login(body: AdminLoginDto): Promise<{
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
    profileGet(req: any): Promise<{
        success: boolean;
        message: string;
        data: Admin;
    }>;
    changePassword(body: {
        oldPassword: string;
        newPassword: string;
    }, req: any): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
    logout(req: any): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
}
