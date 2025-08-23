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
exports.ServicesCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const services_category_entity_1 = require("./entity/services-category.entity");
let ServicesCategoryService = class ServicesCategoryService {
    servicesCategoryRepository;
    constructor(servicesCategoryRepository) {
        this.servicesCategoryRepository = servicesCategoryRepository;
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException || err instanceof common_1.NotFoundException) {
            throw err;
        }
        throw new common_1.InternalServerErrorException('Unexpected error', {
            cause: err,
        });
    }
    isEmptyArray(arr) {
        return !arr || arr.length === 0;
    }
    isEmptyObject(obj) {
        return !obj || Object.keys(obj).length === 0;
    }
    async createCategory(data) {
        try {
            if (!data || !data.name) {
                throw new common_1.BadRequestException("Category name is required");
            }
            const exists = await this.servicesCategoryRepository.findOne({ where: { name: data.name } });
            if (exists) {
                throw new common_1.BadRequestException("Category with this name already exists");
            }
            const newCategory = this.servicesCategoryRepository.create(data);
            const savedCategory = await this.servicesCategoryRepository.save(newCategory);
            return {
                success: true,
                message: "Service category created successfully",
                data: savedCategory,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async findAll() {
        try {
            const categories = await this.servicesCategoryRepository.find();
            if (this.isEmptyArray(categories)) {
                return {
                    success: true,
                    message: "No service categories found",
                    data: [],
                };
            }
            return {
                success: true,
                message: "Service categories retrieved successfully",
                data: categories,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async findOneById(id) {
        try {
            if (!id) {
                throw new common_1.BadRequestException("Category ID is required");
            }
            const category = await this.servicesCategoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException(`Service category with ID ${id} not found`);
            }
            return {
                success: true,
                message: "Service category retrieved successfully",
                data: category,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async updateCategory(id, data) {
        try {
            if (!id) {
                throw new common_1.BadRequestException("Category ID is required");
            }
            if (this.isEmptyObject(data)) {
                throw new common_1.BadRequestException("Update data is required");
            }
            const category = await this.servicesCategoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException(`Service category with ID ${id} not found`);
            }
            Object.assign(category, data, { updated_at: new Date().toISOString().split('T')[0] });
            const updatedCategory = await this.servicesCategoryRepository.save(category);
            return {
                success: true,
                message: "Service category updated successfully",
                data: updatedCategory,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async toggleStatus(id) {
        try {
            if (!id) {
                throw new common_1.BadRequestException("Category ID is required");
            }
            const category = await this.servicesCategoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException(`Service category with ID ${id} not found`);
            }
            category.status = category.status === 1 ? 0 : 1;
            category.updated_at = new Date().toISOString().split('T')[0];
            const updatedCategory = await this.servicesCategoryRepository.save(category);
            return {
                success: true,
                message: `Service category status changed to ${updatedCategory.status === 1 ? 'active' : 'inactive'}`,
                data: updatedCategory,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async findAllForList(limit, offset, page) {
        try {
            if (page && limit) {
                offset = (page - 1) * limit;
            }
            if (limit && offset != undefined) {
                const [categories, total] = await this.servicesCategoryRepository.findAndCount({
                    skip: offset,
                    take: limit,
                });
                return {
                    success: true,
                    message: "Service categories retrieved with pagination",
                    data: {
                        total,
                        limit: Number(limit),
                        offset: Number(offset),
                        name: "arham Azeem",
                        categories,
                    },
                };
            }
            const categories = await this.servicesCategoryRepository.find();
            if (this.isEmptyArray(categories)) {
                return {
                    success: true,
                    message: "No service categories found",
                    data: [],
                };
            }
            return {
                success: true,
                message: "Service categories retrieved successfully",
                data: categories,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
};
exports.ServicesCategoryService = ServicesCategoryService;
exports.ServicesCategoryService = ServicesCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(services_category_entity_1.ServicesCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesCategoryService);
//# sourceMappingURL=services-category.service.js.map