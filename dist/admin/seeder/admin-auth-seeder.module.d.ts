import { OnApplicationBootstrap } from '@nestjs/common';
import { AdminAuthSeederService } from './admin-auth-seeder.service';
export declare class AdminAuthSeederModule implements OnApplicationBootstrap {
    private readonly adminAuthSeederService;
    constructor(adminAuthSeederService: AdminAuthSeederService);
    onApplicationBootstrap(): Promise<void>;
}
