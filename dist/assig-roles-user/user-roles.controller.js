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
exports.UserRolesController = void 0;
const common_1 = require("@nestjs/common");
const user_roles_service_1 = require("./user-roles.service");
const user_role_dto_1 = require("./dtos/user-role.dto");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
let UserRolesController = class UserRolesController {
    userRolesService;
    constructor(userRolesService) {
        this.userRolesService = userRolesService;
    }
    async create(dto) {
        return this.userRolesService.create(dto);
    }
    async findAll() {
        return this.userRolesService.findAll();
    }
    async findOne(id) {
        return this.userRolesService.findOne(id);
    }
    async update(id, dto) {
        return this.userRolesService.update(id, dto);
    }
    async toggleStatus(id) {
        return this.userRolesService.toggleStatus(id);
    }
    async remove(id) {
        return this.userRolesService.remove(id);
    }
};
exports.UserRolesController = UserRolesController;
__decorate([
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_role_dto_1.CreateUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_role_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('toggleStatus/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Delete)('remove:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserRolesController.prototype, "remove", null);
exports.UserRolesController = UserRolesController = __decorate([
    (0, common_1.Controller)('admin/roles-assigning-user'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [user_roles_service_1.UserRolesService])
], UserRolesController);
//# sourceMappingURL=user-roles.controller.js.map