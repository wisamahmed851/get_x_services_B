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
exports.ProviderCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const provider_category_entity_1 = require("./entity/provider-category.entity");
const user_entity_1 = require("../users/entity/user.entity");
const services_category_entity_1 = require("../services-category/entity/services-category.entity");
let ProviderCategoryService = class ProviderCategoryService {
    providerCategoryRepository;
    userRepository;
    categoryRepository;
    constructor(providerCategoryRepository, userRepository, categoryRepository) {
        this.providerCategoryRepository = providerCategoryRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException || err instanceof common_1.NotFoundException) {
            throw err;
        }
        throw new common_1.InternalServerErrorException("Unexpected error", {
            cause: err,
        });
    }
    async assignCategories(providerId, dto) {
        try {
            console.log("Category", providerId);
            const provider = await this.userRepository.findOne({
                where: { id: providerId },
                relations: ["userRoles", "userRoles.role"],
            });
            if (!provider) {
                throw new common_1.NotFoundException("Provider not found");
            }
            console.log("Provider", provider);
            const isProvider = provider.userRoles.some((userRole) => userRole.role && userRole.role.name === "provider");
            if (!isProvider) {
                throw new common_1.BadRequestException("User is not a provider");
            }
            const categories = await this.categoryRepository.findByIds(dto.categories);
            if (categories.length !== dto.categories.length) {
                throw new common_1.BadRequestException("Some categories not found");
            }
            await this.providerCategoryRepository.delete({ provider: { id: providerId } });
            const providerCategories = categories.map((category) => {
                const pc = new provider_category_entity_1.ProviderCategory();
                pc.provider_id = providerId;
                pc.provider = provider;
                pc.category_id = category.id;
                pc.servicescategory = category;
                return pc;
            });
            const saved = await this.providerCategoryRepository.save(providerCategories);
            return {
                success: true,
                message: "Categories assigned to provider successfully",
                data: [],
            };
        }
        catch (error) {
            this.handleUnknown(error);
            return {
                success: false,
                message: error.message || "Failed to assign categories",
                data: null,
            };
        }
    }
    async getProviderCategories(providerId) {
        try {
            const provider = await this.userRepository.findOne({
                where: { id: providerId },
                relations: ["providerCategories", "providerCategories.servicescategory"],
            });
            if (!provider) {
                throw new common_1.NotFoundException("Provider not found");
            }
            const categories = provider.providerCategories.map((pc) => pc.servicescategory);
            return {
                success: true,
                message: "Provider categories fetched successfully",
                data: categories,
            };
        }
        catch (error) {
            this.handleUnknown(error);
            return {
                success: false,
                message: error.message || "Failed to fetch provider categories",
                data: null,
            };
        }
    }
    async getProvidersByCategory(categoryId) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: categoryId },
                relations: ["providerCategories", "providerCategories.provider"],
            });
            if (!category) {
                throw new common_1.NotFoundException("Category not found");
            }
            const providers = category.providerCategories.map((pc) => pc.provider);
            return {
                success: true,
                message: "Providers fetched successfully for this category",
                data: providers,
            };
        }
        catch (error) {
            this.handleUnknown(error);
            return {
                success: false,
                message: error.message || "Failed to fetch providers",
                data: null,
            };
        }
    }
};
exports.ProviderCategoryService = ProviderCategoryService;
exports.ProviderCategoryService = ProviderCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_category_entity_1.ProviderCategory)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(services_category_entity_1.ServicesCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProviderCategoryService);
//# sourceMappingURL=provider-category.service.js.map