"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("./entity/city.entity");
let CityService = class CityService {
    cityRepository;
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }
    handleError(error) {
        console.error('CityService Error:', error);
        throw new common_1.InternalServerErrorException(error.message || 'Something went wrong');
    }
    async createCity(name, created_by) {
        try {
            if (!name || name.trim() === '') {
                throw new common_1.BadRequestException('City name is required');
            }
            if (!created_by) {
                throw new common_1.BadRequestException('Created_by is required');
            }
            const city = this.cityRepository.create({ name: name.trim(), created_by });
            const savedCity = await this.cityRepository.save(city);
            return {
                success: true,
                message: 'City created successfully',
                data: [savedCity],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async getAllCities() {
        try {
            const cities = await this.cityRepository.find({ relations: ['admin'] });
            return {
                success: true,
                message: 'Cities fetched successfully',
                data: cities,
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async getCityById(id) {
        try {
            if (!id)
                throw new common_1.BadRequestException('City ID is required');
            const city = await this.cityRepository.findOne({ where: { id }, relations: ['admin'] });
            if (!city)
                throw new common_1.NotFoundException(`City with ID ${id} not found`);
            return {
                success: true,
                message: 'City fetched successfully',
                data: [city],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async updateCity(id, name) {
        try {
            if (!id)
                throw new common_1.BadRequestException('City ID is required');
            if (!name || name.trim() === '')
                throw new common_1.BadRequestException('City name is required');
            const city = await this.cityRepository.findOne({ where: { id } });
            if (!city)
                throw new common_1.NotFoundException(`City with ID ${id} not found`);
            city.name = name.trim();
            city.updated_at = new Date().toISOString().split('T')[0];
            const updatedCity = await this.cityRepository.save(city);
            return {
                success: true,
                message: 'City updated successfully',
                data: [updatedCity],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async deleteCity(id) {
        try {
            if (!id)
                throw new common_1.BadRequestException('City ID is required');
            const city = await this.cityRepository.findOne({ where: { id } });
            if (!city)
                throw new common_1.NotFoundException(`City with ID ${id} not found`);
            await this.cityRepository.remove(city);
            return {
                success: true,
                message: `City with ID ${id} deleted successfully`,
                data: [],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CityService);
//# sourceMappingURL=city.service.js.map