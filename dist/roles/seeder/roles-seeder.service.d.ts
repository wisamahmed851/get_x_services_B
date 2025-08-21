import { Role } from '../entity/roles.entity';
import { Repository } from 'typeorm';
export declare class RolesSeederService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    seed(): Promise<void>;
}
