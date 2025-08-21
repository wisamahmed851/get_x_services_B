export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city_id: number;
    zone_id: number;
    image: string;
    role_id: number;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    city?: string;
    image?: string;
    id?: number;
}
