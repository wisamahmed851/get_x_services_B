import { Repository } from 'typeorm';
import { Admin } from '../entity/admin.entity';
import { Role } from 'src/roles/entity/roles.entity';
import { AdminRole } from 'src/assig-roles-admin/entity/admin-role.entity';
export declare class AdminAuthSeederService {
    private readonly adminRepository;
    private readonly roleRepo;
    private readonly adminRolerepo;
    private readonly logger;
    constructor(adminRepository: Repository<Admin>, roleRepo: Repository<Role>, adminRolerepo: Repository<AdminRole>);
    seed(): Promise<void>;
}
