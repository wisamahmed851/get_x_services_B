import { Repository } from "typeorm";
import { City } from "./entity/city.entity";
export declare class CityService {
    private readonly cityRepository;
    constructor(cityRepository: Repository<City>);
    private handleError;
    createCity(name: string, created_by: number): Promise<{
        success: boolean;
        message: string;
        data: City[];
    } | undefined>;
    getAllCities(): Promise<{
        success: boolean;
        message: string;
        data: City[];
    } | undefined>;
    getCityById(id: number): Promise<{
        success: boolean;
        message: string;
        data: City[];
    } | undefined>;
    updateCity(id: number, name: string): Promise<{
        success: boolean;
        message: string;
        data: City[];
    } | undefined>;
    deleteCity(id: number): Promise<{
        success: boolean;
        message: string;
        data: never[];
    } | undefined>;
}
