"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_permission_entity_1 = require("./entity/role-permission.entity");
const role_permissions_controller_1 = require("./role-permissions.controller");
const role_permissions_service_1 = require("./role-permissions.service");
const roles_entity_1 = require("../roles/entity/roles.entity");
const permission_entity_1 = require("../permissions/entity/permission.entity");
let RolePermissionModule = class RolePermissionModule {
};
exports.RolePermissionModule = RolePermissionModule;
exports.RolePermissionModule = RolePermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_permission_entity_1.RolePermissions, roles_entity_1.Role, permission_entity_1.Permission])],
        controllers: [role_permissions_controller_1.RolePermissionsController],
        providers: [role_permissions_service_1.RolePermissionsService],
        exports: [role_permissions_service_1.RolePermissionsService],
    })
], RolePermissionModule);
//# sourceMappingURL=role-permissions.module.js.map