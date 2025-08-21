export interface JwtUser {
    id: number;
    email: string;
    roles: string[];
}
export interface JwtAdmin {
    id: number;
    email: string;
    roles: string[];
}
export interface JwtPayload {
    sub: number;
    email: string;
    roles: string[];
    iat?: number;
    exp?: number;
}
