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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthSeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_auth_seeder_service_1 = require("./admin-auth-seeder.service");
const admin_entity_1 = require("../entity/admin.entity");
const roles_entity_1 = require("../../roles/entity/roles.entity");
const admin_role_entity_1 = require("../../assig-roles-admin/entity/admin-role.entity");
let AdminAuthSeederModule = class AdminAuthSeederModule {
    adminAuthSeederService;
    constructor(adminAuthSeederService) {
        this.adminAuthSeederService = adminAuthSeederService;
    }
    async onApplicationBootstrap() {
        await this.adminAuthSeederService.seed();
    }
};
exports.AdminAuthSeederModule = AdminAuthSeederModule;
exports.AdminAuthSeederModule = AdminAuthSeederModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, roles_entity_1.Role, admin_role_entity_1.AdminRole])],
        providers: [admin_auth_seeder_service_1.AdminAuthSeederService],
        exports: [admin_auth_seeder_service_1.AdminAuthSeederService],
    }),
    __metadata("design:paramtypes", [admin_auth_seeder_service_1.AdminAuthSeederService])
], AdminAuthSeederModule);
//# sourceMappingURL=admin-auth-seeder.module.js.map