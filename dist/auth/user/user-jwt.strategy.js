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
exports.UserJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const user_entity_1 = require("../../users/entity/user.entity");
const typeorm_2 = require("typeorm");
let UserJwtStrategy = class UserJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'user-jwt') {
    userRepo;
    constructor(userRepo) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'user-secret-key',
            passReqToCallback: true,
        });
        this.userRepo = userRepo;
    }
    async validate(req, payload) {
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const user = await this.userRepo.findOne({
            where: { id: payload.sub },
        });
        if (!user || !user.access_token)
            throw new common_1.UnauthorizedException('Invalid or expired token');
        if (token !== user.access_token)
            throw new common_1.UnauthorizedException('Token revoked or expired');
        return {
            ...user,
            roles: payload.roles,
        };
    }
};
exports.UserJwtStrategy = UserJwtStrategy;
exports.UserJwtStrategy = UserJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserJwtStrategy);
//# sourceMappingURL=user-jwt.strategy.js.map