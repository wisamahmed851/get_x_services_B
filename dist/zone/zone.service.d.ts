import { Repository } from "typeorm";
import { Zone } from "./entity/zone.entity";
export declare class ZoneService {
    private readonly zoneRepository;
    constructor(zoneRepository: Repository<Zone>);
    private handleError;
    createZone(name: string, created_by: number): Promise<{
        success: boolean;
        message: string;
        data: Zone[];
    } | undefined>;
    getAllZones(): Promise<{
        success: boolean;
        message: string;
        data: Zone[];
    } | undefined>;
    getZoneById(id: number): Promise<{
        success: boolean;
        message: string;
        data: Zone[];
    } | undefined>;
    updateZone(id: number, name: string): Promise<{
        success: boolean;
        message: string;
        data: Zone[];
    } | undefined>;
    deleteZone(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    } | undefined>;
}
