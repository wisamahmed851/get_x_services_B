import { RolesSeederService } from './roles-seeder.service';
export declare class RolesSeederModule {
    private readonly rolesSeederService;
    constructor(rolesSeederService: RolesSeederService);
    onApplicationBootstrap(): Promise<void>;
}
