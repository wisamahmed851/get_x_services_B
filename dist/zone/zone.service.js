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
exports.ZoneService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const zone_entity_1 = require("./entity/zone.entity");
let ZoneService = class ZoneService {
    zoneRepository;
    constructor(zoneRepository) {
        this.zoneRepository = zoneRepository;
    }
    handleError(error) {
        console.error('ZoneService Error:', error);
        throw new common_1.InternalServerErrorException(error.message || 'Something went wrong');
    }
    async createZone(name, created_by) {
        try {
            if (!name || name.trim() === '') {
                throw new common_1.BadRequestException('Zone name is required');
            }
            if (!created_by) {
                throw new common_1.BadRequestException('Created_by is required');
            }
            const zone = this.zoneRepository.create({ name: name.trim(), created_by });
            const savedZone = await this.zoneRepository.save(zone);
            return {
                success: true,
                message: 'Zone created successfully',
                data: [savedZone],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async getAllZones() {
        try {
            const zones = await this.zoneRepository.find({ relations: ['admin'] });
            return {
                success: true,
                message: 'zones fetched successfully',
                data: zones,
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async getZoneById(id) {
        try {
            if (!id)
                throw new common_1.BadRequestException('Zone ID is required');
            const zone = await this.zoneRepository.findOne({ where: { id }, relations: ['admin'] });
            if (!zone)
                throw new common_1.NotFoundException(`Zone with ID ${id} not found`);
            return {
                success: true,
                message: 'Zone fetched successfully',
                data: [zone],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async updateZone(id, name) {
        try {
            if (!id)
                throw new common_1.BadRequestException('Zone ID is required');
            if (!name || name.trim() === '')
                throw new common_1.BadRequestException('Zone name is required');
            const zone = await this.zoneRepository.findOne({ where: { id } });
            if (!zone)
                throw new common_1.NotFoundException(`Zone with ID ${id} not found`);
            zone.name = name.trim();
            zone.updated_at = new Date().toISOString().split('T')[0];
            const updatedZone = await this.zoneRepository.save(zone);
            return {
                success: true,
                message: 'Zone updated successfully',
                data: [updatedZone],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async deleteZone(id) {
        try {
            if (!id)
                throw new common_1.BadRequestException('Zone ID is required');
            const zone = await this.zoneRepository.findOne({ where: { id } });
            if (!zone)
                throw new common_1.NotFoundException(`Zone with ID ${id} not found`);
            await this.zoneRepository.remove(zone);
            return {
                success: true,
                message: `Zone with ID ${id} deleted successfully`,
                data: [],
            };
        }
        catch (error) {
            this.handleError(error);
        }
    }
};
exports.ZoneService = ZoneService;
exports.ZoneService = ZoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zone_entity_1.Zone)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ZoneService);
//# sourceMappingURL=zone.service.js.map