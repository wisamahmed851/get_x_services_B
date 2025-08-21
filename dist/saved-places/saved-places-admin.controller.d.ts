import { SavedPlacesService } from './saved-places.service';
import { Admin } from 'src/admin/entity/admin.entity';
export declare class SavedPlacesAdminController {
    private readonly savedService;
    constructor(savedService: SavedPlacesService);
    findAllForAdmin(admin: Admin, userId?: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/saved-place.entity").SavedPlace[];
    }>;
}
