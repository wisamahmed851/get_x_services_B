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
exports.SavedPlacesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const saved_place_entity_1 = require("./entity/saved-place.entity");
const user_entity_1 = require("../users/entity/user.entity");
const admin_entity_1 = require("../admin/entity/admin.entity");
let SavedPlacesService = class SavedPlacesService {
    savedRepo;
    userRepo;
    adminRepo;
    constructor(savedRepo, userRepo, adminRepo) {
        this.savedRepo = savedRepo;
        this.userRepo = userRepo;
        this.adminRepo = adminRepo;
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException || err instanceof common_1.NotFoundException) {
            throw err;
        }
        throw new common_1.InternalServerErrorException('Unexpected server error occurred', {
            cause: err,
        });
    }
    async create(dto, userId) {
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            const savedPlace = this.savedRepo.create({
                ...dto,
                user_id: user.id,
                created_by: user.id,
            });
            const created = await this.savedRepo.save(savedPlace);
            return {
                success: true,
                message: 'Saved place has been created',
                data: created,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll(userId) {
        try {
            const list = await this.savedRepo.find({
                where: { user_id: userId },
                order: { created_at: 'DESC' },
            });
            return {
                success: true,
                message: 'Saved places fetched successfully',
                data: list,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAllForAdmin(adminId, userId) {
        try {
            const query = this.savedRepo.createQueryBuilder('savedPlaces')
                .leftJoinAndSelect('savedPlaces.user', 'user')
                .orderBy('savedPlaces.created_at', 'DESC');
            if (userId) {
                query.where('savedPlaces.user_id = :userId', { userId });
            }
            const list = await query.getMany();
            return {
                success: true,
                message: 'All saved places fetched successfully',
                data: list,
            };
        }
        catch (err) {
            console.error('Error fetching saved places for admin:', err);
            this.handleUnknown(err);
        }
    }
    async findOne(id, userId) {
        try {
            const place = await this.savedRepo.findOne({
                where: { id, user_id: userId },
            });
            if (!place) {
                throw new common_1.NotFoundException('Saved place not found');
            }
            return {
                success: true,
                message: 'Saved place fetched successfully',
                data: place,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, dto, userId) {
        try {
            const record = await this.savedRepo.findOne({
                where: { id, user_id: userId },
            });
            if (!record) {
                throw new common_1.NotFoundException('Saved place not found');
            }
            Object.assign(record, dto);
            const updated = await this.savedRepo.save(record);
            return {
                success: true,
                message: 'Saved place updated successfully',
                data: updated,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id, userId) {
        try {
            const record = await this.savedRepo.findOne({
                where: { id, user_id: userId },
            });
            if (!record) {
                throw new common_1.NotFoundException('Saved place not found');
            }
            await this.savedRepo.remove(record);
            return {
                success: true,
                message: 'Saved place deleted successfully',
                data: {},
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
};
exports.SavedPlacesService = SavedPlacesService;
exports.SavedPlacesService = SavedPlacesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(saved_place_entity_1.SavedPlace)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SavedPlacesService);
//# sourceMappingURL=saved-places.service.js.map