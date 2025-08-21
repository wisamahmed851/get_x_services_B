"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_permission_entity_1 = require("./entity/user-permission.entity");
const user_entity_1 = require("../users/entity/user.entity");
const permission_entity_1 = require("../permissions/entity/permission.entity");
const user_permissions_controller_1 = require("./user-permissions.controller");
const user_permissions_service_1 = require("./user-permissions.service");
let UserPermissionModule = class UserPermissionModule {
};
exports.UserPermissionModule = UserPermissionModule;
exports.UserPermissionModule = UserPermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_permission_entity_1.UserPermission, user_entity_1.User, permission_entity_1.Permission])],
        controllers: [user_permissions_controller_1.UserPermissionsController],
        providers: [user_permissions_service_1.UserPermissionsService],
        exports: [user_permissions_service_1.UserPermissionsService],
    })
], UserPermissionModule);
//# sourceMappingURL=user-permission.module.js.map