import { OnApplicationBootstrap } from '@nestjs/common';
import { UserAuthSeederService } from './user-auth-seeder.service';
export declare class UserAuthSeederModule implements OnApplicationBootstrap {
    private readonly userAuthSeederService;
    constructor(userAuthSeederService: UserAuthSeederService);
    onApplicationBootstrap(): Promise<void>;
}
