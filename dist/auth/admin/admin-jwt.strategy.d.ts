import { Strategy } from 'passport-jwt';
import { Admin } from 'src/admin/entity/admin.entity';
import { Repository } from 'typeorm';
declare const AdminJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class AdminJwtStrategy extends AdminJwtStrategy_base {
    private adminRepo;
    constructor(adminRepo: Repository<Admin>);
    validate(req: Request, payload: any): Promise<Admin>;
}
export {};
