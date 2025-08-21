"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthModule = void 0;
const common_1 = require("@nestjs/common");
const user_auth_service_1 = require("./user-auth.service");
const user_auth_controller_1 = require("./user-auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../users/entity/user.entity");
const jwt_1 = require("@nestjs/jwt");
const user_jwt_strategy_1 = require("./user-jwt.strategy");
const roles_entity_1 = require("../../roles/entity/roles.entity");
const user_role_entity_1 = require("../../assig-roles-user/entity/user-role.entity");
const city_entity_1 = require("../../city/entity/city.entity");
const zone_entity_1 = require("../../zone/entity/zone.entity");
const user_details_entity_1 = require("../../users/entity/user_details.entity");
let UserAuthModule = class UserAuthModule {
};
exports.UserAuthModule = UserAuthModule;
exports.UserAuthModule = UserAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, roles_entity_1.Role, user_role_entity_1.UserRole, city_entity_1.City, zone_entity_1.Zone, user_details_entity_1.UserDetails]),
            jwt_1.JwtModule.register({
                secret: 'user-secret-key',
                signOptions: { expiresIn: '30m' },
            }),
        ],
        controllers: [user_auth_controller_1.UserAuthController],
        providers: [user_auth_service_1.UserAuthService, user_jwt_strategy_1.UserJwtStrategy],
        exports: [user_auth_service_1.UserAuthService],
    })
], UserAuthModule);
//# sourceMappingURL=user-auth.module.js.map