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
exports.ServicesCategoryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../common/utils/multer.config");
const services_category_service_1 = require("./services-category.service");
const services_category_dto_1 = require("./dtos/services-category.dto");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
let ServicesCategoryController = class ServicesCategoryController {
    servicesCategoryService;
    constructor(servicesCategoryService) {
        this.servicesCategoryService = servicesCategoryService;
    }
    async createCategory(file, data) {
        if (file) {
            data.image = file.filename;
        }
        return this.servicesCategoryService.createCategory(data);
    }
    async getAllCategories() {
        return this.servicesCategoryService.findAll();
    }
    async getCategoryById(id) {
        return this.servicesCategoryService.findOneById(id);
    }
    async updateCategory(id, file, data) {
        if (file) {
            data.image = file.filename;
        }
        return this.servicesCategoryService.updateCategory(id, data);
    }
    async toggleCategoryStatus(id) {
        return this.servicesCategoryService.toggleStatus(id);
    }
};
exports.ServicesCategoryController = ServicesCategoryController;
__decorate([
    (0, common_1.Post)('store'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, services_category_dto_1.ServicesCategoryDto]),
    __metadata("design:returntype", Promise)
], ServicesCategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)("index"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesCategoryController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesCategoryController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesCategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Patch)('toggle-status/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesCategoryController.prototype, "toggleCategoryStatus", null);
exports.ServicesCategoryController = ServicesCategoryController = __decorate([
    (0, common_1.Controller)('admin/services-category'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [services_category_service_1.ServicesCategoryService])
], ServicesCategoryController);
//# sourceMappingURL=services-category.controller.js.map