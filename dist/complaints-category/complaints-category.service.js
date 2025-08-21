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
exports.ComplaintsCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const complaints_category_entity_1 = require("./entity/complaints_category.entity");
let ComplaintsCategoryService = class ComplaintsCategoryService {
    categoryRepo;
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async create(body, userId) {
        try {
            const category = this.categoryRepo.create({
                name: body.name,
                icon: body.icon,
                created_by: userId
            });
            const saved = await this.categoryRepo.save(category);
            return {
                success: true,
                message: 'Complaint category created successfully.',
                data: saved,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                success: false,
                message: 'Failed to create complaint category.',
                error: error.message,
            });
        }
    }
    async findAll() {
        try {
            const categories = await this.categoryRepo.find({
                where: { status: 1 },
                relations: ['admin'],
            });
            return {
                success: true,
                message: 'Active complaint categories fetched successfully.',
                data: categories,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                success: false,
                message: 'Failed to fetch complaint categories.',
                error: error.message,
            });
        }
    }
    async findOne(id) {
        try {
            const category = await this.categoryRepo.findOne({
                where: { id },
                relations: ['admin'],
            });
            if (!category) {
                throw new common_1.NotFoundException({
                    success: false,
                    message: `Complaint category with ID ${id} not found.`,
                    data: [],
                });
            }
            return {
                success: true,
                message: `Complaint category with ID ${id} fetched successfully.`,
                data: category,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException({
                success: false,
                message: 'Failed to fetch complaint category.',
                error: error.message,
            });
        }
    }
    async update(id, dto) {
        try {
            const result = await this.findOne(id);
            const category = result.data;
            if (dto.name) {
                category.name = dto.name;
            }
            if (dto.icon) {
                category.icon = dto.icon;
            }
            category.updated_at = new Date().toISOString().split('T')[0];
            const updated = await this.categoryRepo.save(category);
            return {
                success: true,
                message: `Complaint category with ID ${id} updated successfully.`,
                data: updated,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                success: false,
                message: `Failed to update complaint category with ID ${id}.`,
                error: error.message,
            });
        }
    }
    async delete(id) {
        try {
            const result = await this.findOne(id);
            const category = result.data;
            category.status = category.status === 0 ? 1 : 0;
            category.updated_at = new Date().toISOString().split('T')[0];
            await this.categoryRepo.save(category);
            const messge = category.status === 0 ? "Marked As InActive" : "'Marked As Active";
            return {
                success: true,
                message: messge,
                data: category,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                success: false,
                message: `Failed to delete complaint category with ID ${id}.`,
                error: error.message,
            });
        }
    }
};
exports.ComplaintsCategoryService = ComplaintsCategoryService;
exports.ComplaintsCategoryService = ComplaintsCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(complaints_category_entity_1.complaintsCaterory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ComplaintsCategoryService);
//# sourceMappingURL=complaints-category.service.js.map