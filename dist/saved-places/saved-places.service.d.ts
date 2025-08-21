import { Repository } from 'typeorm';
import { SavedPlace } from './entity/saved-place.entity';
import { CreateSavedPlaceDto, UpdateSavedPlaceDto } from './dtos/saved-place.dto';
import { User } from 'src/users/entity/user.entity';
import { Admin } from 'src/admin/entity/admin.entity';
export declare class SavedPlacesService {
    private readonly savedRepo;
    private readonly userRepo;
    private readonly adminRepo;
    constructor(savedRepo: Repository<SavedPlace>, userRepo: Repository<User>, adminRepo: Repository<Admin>);
    private handleUnknown;
    create(dto: CreateSavedPlaceDto, userId: number): Promise<{
        success: boolean;
        message: string;
        data: SavedPlace;
    }>;
    findAll(userId: number): Promise<{
        success: boolean;
        message: string;
        data: SavedPlace[];
    }>;
    findAllForAdmin(adminId: number, userId?: number): Promise<{
        success: boolean;
        message: string;
        data: SavedPlace[];
    }>;
    findOne(id: number, userId: number): Promise<{
        success: boolean;
        message: string;
        data: SavedPlace;
    }>;
    update(id: number, dto: UpdateSavedPlaceDto, userId: number): Promise<{
        success: boolean;
        message: string;
        data: SavedPlace;
    }>;
    remove(id: number, userId: number): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
}
