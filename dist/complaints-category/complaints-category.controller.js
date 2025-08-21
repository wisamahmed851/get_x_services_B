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
exports.ComplaintsCategoryController = void 0;
const common_1 = require("@nestjs/common");
const complaints_category_service_1 = require("./complaints-category.service");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
const complain_category_dto_1 = require("./dto/complain-category.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../common/utils/multer.config");
let ComplaintsCategoryController = class ComplaintsCategoryController {
    service;
    constructor(service) {
        this.service = service;
    }
    async store(body, file, userId) {
        if (file) {
            body.icon = file.filename;
        }
        return await this.service.create(body, userId);
    }
    async findAll() {
        return await this.service.findAll();
    }
    async findOne(id) {
        return await this.service.findOne(id);
    }
    async update(id, dto, file) {
        if (file) {
            dto.icon = file.filename;
        }
        return await this.service.update(id, dto);
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
exports.ComplaintsCategoryController = ComplaintsCategoryController;
__decorate([
    (0, common_1.Post)('store'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('icon', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [complain_category_dto_1.CreateComplainCategoryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ComplaintsCategoryController.prototype, "store", null);
__decorate([
    (0, common_1.Get)('list-all-categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComplaintsCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ComplaintsCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('icon', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, complain_category_dto_1.UpdateComplainCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], ComplaintsCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ComplaintsCategoryController.prototype, "delete", null);
exports.ComplaintsCategoryController = ComplaintsCategoryController = __decorate([
    (0, common_1.Controller)('complaints-category'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [complaints_category_service_1.ComplaintsCategoryService])
], ComplaintsCategoryController);
function GetUser(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=complaints-category.controller.js.map