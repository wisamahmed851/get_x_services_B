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
exports.AdminsController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_admin_dto_1 = require("./dtos/create-admin.dto");
const update_admin_dto_1 = require("./dtos/update-admin.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../common/utils/multer.config");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
let AdminsController = class AdminsController {
    adminsService;
    constructor(adminsService) {
        this.adminsService = adminsService;
    }
    create(dto, file) {
        const image = file?.filename;
        return this.adminsService.create(dto, image);
    }
    findAll() {
        return this.adminsService.findAll();
    }
    allAvtive() {
        return this.adminsService.allAvtive();
    }
    findOne(id) {
        return this.adminsService.findOne(id);
    }
    update(id, dto, file) {
        const image = file?.filename;
        return this.adminsService.update(id, { ...dto, image });
    }
    remove(id) {
        return this.adminsService.remove(id);
    }
    statusChange(id) {
        return this.adminsService.statusUpdate(id);
    }
};
exports.AdminsController = AdminsController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('store'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto, Object]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "allAvtive", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_admin_dto_1.UpdateAdminDto, Object]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('toogleStatus/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "statusChange", null);
exports.AdminsController = AdminsController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminsService])
], AdminsController);
//# sourceMappingURL=admin.controller.js.map