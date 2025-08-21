import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { UserRole } from 'src/assig-roles-user/entity/user-role.entity';
export declare class UserAuthSeederService {
    private readonly userRepo;
    private readonly roleRepo;
    private readonly userRoleRepo;
    private readonly logger;
    constructor(userRepo: Repository<User>, roleRepo: Repository<Role>, userRoleRepo: Repository<UserRole>);
    seed(): Promise<void>;
    private deleteUserWithRoles;
    private seedUser;
}
