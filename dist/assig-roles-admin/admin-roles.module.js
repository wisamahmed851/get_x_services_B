"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_role_entity_1 = require("./entity/admin-role.entity");
const admin_entity_1 = require("../admin/entity/admin.entity");
const roles_entity_1 = require("../roles/entity/roles.entity");
const admin_roles_controller_1 = require("./admin-roles.controller");
const admin_roles_service_1 = require("./admin-roles.service");
let AdminRoleModule = class AdminRoleModule {
};
exports.AdminRoleModule = AdminRoleModule;
exports.AdminRoleModule = AdminRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_role_entity_1.AdminRole, admin_entity_1.Admin, roles_entity_1.Role])],
        controllers: [admin_roles_controller_1.AdminRolesController],
        providers: [admin_roles_service_1.AdminRolesService],
        exports: [admin_roles_service_1.AdminRolesService],
    })
], AdminRoleModule);
//# sourceMappingURL=admin-roles.module.js.map