import { CityService } from "./city.service";
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    createCity(name: string, created_by: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/city.entity").City[];
    } | undefined>;
    getAllCities(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/city.entity").City[];
    } | undefined>;
    getCityById(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/city.entity").City[];
    } | undefined>;
    updateCity(id: number, name: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/city.entity").City[];
    } | undefined>;
}
