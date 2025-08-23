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
exports.ProviderCategoryController = void 0;
const common_1 = require("@nestjs/common");
const provider_category_service_1 = require("./provider-category.service");
const provider_category_dto_1 = require("./dtos/provider-category.dto");
const user_jwt_guard_1 = require("../auth/user/user-jwt.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let ProviderCategoryController = class ProviderCategoryController {
    providerCategoryService;
    constructor(providerCategoryService) {
        this.providerCategoryService = providerCategoryService;
    }
    async assignCategories(providerId, dto) {
        return this.providerCategoryService.assignCategories(providerId, dto);
    }
    async getProviderCategories(providerId) {
        return this.providerCategoryService.getProviderCategories(providerId);
    }
    async getProvidersByCategory(categoryId) {
        return this.providerCategoryService.getProvidersByCategory(categoryId);
    }
};
exports.ProviderCategoryController = ProviderCategoryController;
__decorate([
    (0, common_1.Post)("/assign"),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, provider_category_dto_1.AssignCategoriesDto]),
    __metadata("design:returntype", Promise)
], ProviderCategoryController.prototype, "assignCategories", null);
__decorate([
    (0, common_1.Get)("/categories"),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProviderCategoryController.prototype, "getProviderCategories", null);
__decorate([
    (0, common_1.Get)("category/:categoryId/providers"),
    __param(0, (0, common_1.Param)("categoryId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProviderCategoryController.prototype, "getProvidersByCategory", null);
exports.ProviderCategoryController = ProviderCategoryController = __decorate([
    (0, common_1.Controller)("provider-category"),
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [provider_category_service_1.ProviderCategoryService])
], ProviderCategoryController);
//# sourceMappingURL=provider-category.controller.js.map