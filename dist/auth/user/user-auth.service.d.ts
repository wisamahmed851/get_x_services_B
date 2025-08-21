import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { UserRole } from 'src/assig-roles-user/entity/user-role.entity';
import { UpdateProfileDto, UserRegisterDto } from './dtos/user-auth.dto';
import { City } from 'src/city/entity/city.entity';
import { Zone } from 'src/zone/entity/zone.entity';
import { UserDetails } from 'src/users/entity/user_details.entity';
import { ConfigService } from '@nestjs/config';
export declare class UserAuthService {
    private userRepository;
    private jwtService;
    private roleRepo;
    private userRoleRepo;
    private cityRepo;
    private zoneRepo;
    private userDetailsRepo;
    private readonly dataSource;
    private readonly configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, roleRepo: Repository<Role>, userRoleRepo: Repository<UserRole>, cityRepo: Repository<City>, zoneRepo: Repository<Zone>, userDetailsRepo: Repository<UserDetails>, dataSource: DataSource, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private handleUnknown;
    register(body: UserRegisterDto): Promise<{
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
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
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
    currentLocation(userId: number, body: {
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
    refreshToken(refreshToken: string): Promise<{
        success: boolean;
        message: string;
        data: {
            access_token: string;
            user: any;
        };
    }>;
    profile(user: User): Promise<{
        success: boolean;
        message: string;
        data: User;
    }>;
    profileUpdate(user: User, body: UpdateProfileDto): Promise<{
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
    modeChnage(user: User): Promise<{
        success: boolean;
        message: string;
        data: User;
    }>;
    logout(data: User): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
}
