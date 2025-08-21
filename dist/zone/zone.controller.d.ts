import { ZoneService } from "./zone.service";
export declare class ZoneController {
    private readonly zoneService;
    constructor(zoneService: ZoneService);
    createCity(name: string, created_by: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/zone.entity").Zone[];
    } | undefined>;
    getAllCities(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/zone.entity").Zone[];
    } | undefined>;
    getZoneById(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/zone.entity").Zone[];
    } | undefined>;
    updateZone(id: number, name: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/zone.entity").Zone[];
    } | undefined>;
}
