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
exports.UserAuthSeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../users/entity/user.entity");
const roles_entity_1 = require("../../../roles/entity/roles.entity");
const user_role_entity_1 = require("../../../assig-roles-user/entity/user-role.entity");
const user_auth_seeder_service_1 = require("./user-auth-seeder.service");
let UserAuthSeederModule = class UserAuthSeederModule {
    userAuthSeederService;
    constructor(userAuthSeederService) {
        this.userAuthSeederService = userAuthSeederService;
    }
    async onApplicationBootstrap() {
        await this.userAuthSeederService.seed();
    }
};
exports.UserAuthSeederModule = UserAuthSeederModule;
exports.UserAuthSeederModule = UserAuthSeederModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, roles_entity_1.Role, user_role_entity_1.UserRole])],
        providers: [user_auth_seeder_service_1.UserAuthSeederService],
        exports: [user_auth_seeder_service_1.UserAuthSeederService],
    }),
    __metadata("design:paramtypes", [user_auth_seeder_service_1.UserAuthSeederService])
], UserAuthSeederModule);
//# sourceMappingURL=user-auth-seeder.module.js.map