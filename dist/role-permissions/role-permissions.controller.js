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
exports.RolePermissionsController = void 0;
const common_1 = require("@nestjs/common");
const role_permissions_service_1 = require("./role-permissions.service");
const role_permission_dto_1 = require("./dto/role-permission.dto");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
let RolePermissionsController = class RolePermissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    toogleStatus(id) {
        return this.service.toogleStatus(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.RolePermissionsController = RolePermissionsController;
__decorate([
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_permission_dto_1.CreateRolePermissionAssigningDto]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('toogleStatus/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "toogleStatus", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_permission_dto_1.UpdateRolePermissionAssigningDto]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "remove", null);
exports.RolePermissionsController = RolePermissionsController = __decorate([
    (0, common_1.Controller)('admin/role-permissions'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [role_permissions_service_1.RolePermissionsService])
], RolePermissionsController);
//# sourceMappingURL=role-permissions.controller.js.map