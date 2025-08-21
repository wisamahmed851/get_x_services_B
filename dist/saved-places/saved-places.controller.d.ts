import { SavedPlacesService } from './saved-places.service';
import { CreateSavedPlaceDto, UpdateSavedPlaceDto } from './dtos/saved-place.dto';
import { User } from 'src/users/entity/user.entity';
export declare class SavedPlacesController {
    private readonly savedService;
    constructor(savedService: SavedPlacesService);
    create(dto: CreateSavedPlaceDto, id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/saved-place.entity").SavedPlace;
    }>;
    findAll(user: User): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/saved-place.entity").SavedPlace[];
    }>;
    findOne(id: number, user: User): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/saved-place.entity").SavedPlace;
    }>;
    update(id: number, dto: UpdateSavedPlaceDto, user: User): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/saved-place.entity").SavedPlace;
    }>;
    remove(id: number, user: User): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
}
