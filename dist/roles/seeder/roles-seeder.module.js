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
exports.RolesSeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_entity_1 = require("../entity/roles.entity");
const roles_seeder_service_1 = require("./roles-seeder.service");
let RolesSeederModule = class RolesSeederModule {
    rolesSeederService;
    constructor(rolesSeederService) {
        this.rolesSeederService = rolesSeederService;
    }
    async onApplicationBootstrap() {
        await this.rolesSeederService.seed();
    }
};
exports.RolesSeederModule = RolesSeederModule;
exports.RolesSeederModule = RolesSeederModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([roles_entity_1.Role])],
        providers: [roles_seeder_service_1.RolesSeederService],
        exports: [roles_seeder_service_1.RolesSeederService],
    }),
    __metadata("design:paramtypes", [roles_seeder_service_1.RolesSeederService])
], RolesSeederModule);
//# sourceMappingURL=roles-seeder.module.js.map