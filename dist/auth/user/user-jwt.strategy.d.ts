import { Strategy } from 'passport-jwt';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
declare const UserJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class UserJwtStrategy extends UserJwtStrategy_base {
    private userRepo;
    constructor(userRepo: Repository<User>);
    validate(req: Request, payload: {
        sub: number;
        email: string;
        roles: string[];
    }): Promise<{
        roles: string[];
        id: number;
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        gender: string;
        street: string;
        district: string;
        image: string;
        location: string;
        city_id: number;
        city: import("../../city/entity/city.entity").City;
        zone_id: number;
        zone: import("../../zone/entity/zone.entity").Zone;
        status: number;
        isVarified: number;
        isOnline: number;
        created_at: string;
        updated_at: string;
        userDetails: import("../../users/entity/user_details.entity").UserDetails;
        access_token: string;
        refresh_token: string;
        fcm_token: string;
        userRoles: import("../../assig-roles-user/entity/user-role.entity").UserRole[];
    }>;
}
export {};
