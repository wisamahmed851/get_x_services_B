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
exports.UserPermissionsController = void 0;
const common_1 = require("@nestjs/common");
const user_permissions_service_1 = require("./user-permissions.service");
const user_permission_dto_1 = require("./dtos/user-permission.dto");
let UserPermissionsController = class UserPermissionsController {
    userPermissionsService;
    constructor(userPermissionsService) {
        this.userPermissionsService = userPermissionsService;
    }
    create(dto) {
        return this.userPermissionsService.create(dto);
    }
    findAll() {
        return this.userPermissionsService.findAll();
    }
    findOne(id) {
        return this.userPermissionsService.findOne(id);
    }
    toggleStatus(id) {
        return this.userPermissionsService.toggleStatus(id);
    }
    update(id, dto) {
        return this.userPermissionsService.update(id, dto);
    }
    remove(id) {
        return this.userPermissionsService.remove(id);
    }
};
exports.UserPermissionsController = UserPermissionsController;
__decorate([
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_permission_dto_1.CreateUserPermissionDto]),
    __metadata("design:returntype", void 0)
], UserPermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserPermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserPermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('toggleStatus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserPermissionsController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_permission_dto_1.UpdateUserPermissionDto]),
    __metadata("design:returntype", void 0)
], UserPermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserPermissionsController.prototype, "remove", null);
exports.UserPermissionsController = UserPermissionsController = __decorate([
    (0, common_1.Controller)('admin/permission-assigning-admin'),
    __metadata("design:paramtypes", [user_permissions_service_1.UserPermissionsService])
], UserPermissionsController);
//# sourceMappingURL=user-permissions.controller.js.map