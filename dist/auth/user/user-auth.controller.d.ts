import { UserLoginDto } from './dtos/user-login.dto';
import { UserAuthService } from './user-auth.service';
import { User } from 'src/users/entity/user.entity';
import { UpdateProfileDto, UserRegisterDto } from './dtos/user-auth.dto';
export declare class UserAuthController {
    private readonly userAuthService;
    constructor(userAuthService: UserAuthService);
    login(body: UserLoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
            role: {
                id: number;
                name: string;
            } | null;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        success: boolean;
        message: string;
        data: {
            access_token: string;
            user: any;
        };
    }>;
    register(body: UserRegisterDto, files: {
        identity_card_front?: Express.Multer.File;
        identity_card_back?: Express.Multer.File;
        profile_image?: Express.Multer.File[];
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                phone: string;
            };
            access_token?: undefined;
            refresh_token?: undefined;
            role?: undefined;
        };
    } | {
        success: boolean;
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
            role: string | null;
            user?: undefined;
        };
    }>;
    profile(user: User): Promise<{
        success: boolean;
        message: string;
        data: User;
    }>;
    currentLocation(user: User, body: {
        langitude: number;
        latitude: number;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            User: {
                id: any;
                name: any;
                email: any;
                phone: any;
                address: any;
                longitude: any;
                latitude: any;
            };
        };
    }>;
    profileUpdate(user: User, body: UpdateProfileDto, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: User;
    }>;
    changePassword(body: {
        oldPassword: string;
        newPassword: string;
    }, user: User): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
    changeMode(user: User): Promise<{
        success: boolean;
        message: string;
        data: User;
    }>;
    logout(user: User): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
}
