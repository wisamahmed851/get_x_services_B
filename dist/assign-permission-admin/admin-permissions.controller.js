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
exports.AdminPermissionsController = void 0;
const common_1 = require("@nestjs/common");
const admin_permissions_service_1 = require("./admin-permissions.service");
const admin_permission_dto_1 = require("./dtos/admin-permission.dto");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
let AdminPermissionsController = class AdminPermissionsController {
    adminPermissionsService;
    constructor(adminPermissionsService) {
        this.adminPermissionsService = adminPermissionsService;
    }
    create(dto) {
        return this.adminPermissionsService.create(dto);
    }
    findAll() {
        return this.adminPermissionsService.findAll();
    }
    findOne(id) {
        return this.adminPermissionsService.findOne(id);
    }
    toggleStatus(id) {
        return this.adminPermissionsService.toggleStatus(id);
    }
    update(id, dto) {
        return this.adminPermissionsService.update(id, dto);
    }
    remove(id) {
        return this.adminPermissionsService.remove(id);
    }
};
exports.AdminPermissionsController = AdminPermissionsController;
__decorate([
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_permission_dto_1.CreateAdminPermissionDto]),
    __metadata("design:returntype", void 0)
], AdminPermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminPermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('toggleStatus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminPermissionsController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_permission_dto_1.UpdateAdminPermissionDto]),
    __metadata("design:returntype", void 0)
], AdminPermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminPermissionsController.prototype, "remove", null);
exports.AdminPermissionsController = AdminPermissionsController = __decorate([
    (0, common_1.Controller)('admin/permission-assigning-admin'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [admin_permissions_service_1.AdminPermissionsService])
], AdminPermissionsController);
//# sourceMappingURL=admin-permissions.controller.js.map