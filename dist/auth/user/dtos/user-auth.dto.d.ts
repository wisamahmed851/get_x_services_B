export declare class UserLoginDto {
    email: string;
    password: string;
}
export declare class UserRegisterDto {
    name: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
    confirm_password: string;
    role: string;
    city_id: number;
    zone_id: number;
    image: string;
    identity_card_front_url: string;
    identity_card_back_url: string;
}
export declare class UpdateProfileDto {
    name: string;
    phone: string;
    address: string;
    street: string;
    district: string;
    gender: string;
    city: string;
    image: string;
    city_id: number;
    zone_id: number;
}
