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
exports.UserAuthController = void 0;
const common_1 = require("@nestjs/common");
const user_login_dto_1 = require("./dtos/user-login.dto");
const user_auth_service_1 = require("./user-auth.service");
const user_jwt_guard_1 = require("./user-jwt.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const user_entity_1 = require("../../users/entity/user.entity");
const user_auth_dto_1 = require("./dtos/user-auth.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../../common/utils/multer.config");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let UserAuthController = class UserAuthController {
    userAuthService;
    constructor(userAuthService) {
        this.userAuthService = userAuthService;
    }
    async login(body) {
        const user = await this.userAuthService.validateUser(body.email, body.password);
        return await this.userAuthService.login(user);
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new Error('Refresh token is required');
        }
        return await this.userAuthService.refreshToken(refreshToken);
    }
    async register(body, files) {
        if (files?.identity_card_front?.[0]) {
            body.identity_card_front_url = files.identity_card_front[0].filename;
        }
        if (files?.identity_card_back?.[0]) {
            body.identity_card_back_url = files.identity_card_back[0].filename;
        }
        if (files?.profile_image?.[0]) {
            body.image = files.profile_image[0].filename;
        }
        return this.userAuthService.register(body);
    }
    async profile(user) {
        return await this.userAuthService.profile(user);
    }
    async currentLocation(user, body) {
        return await this.userAuthService.currentLocation(user.id, body);
    }
    async profileUpdate(user, body, file) {
        const uploaddata = file ? { ...body, image: file.filename } : body;
        return await this.userAuthService.profileUpdate(user, uploaddata);
    }
    async changePassword(body, user) {
        return await this.userAuthService.changePassword(body, user);
    }
    async changeMode(user) {
        return this.userAuthService.modeChnage(user);
    }
    async logout(user) {
        return await this.userAuthService.logout(user);
    }
};
exports.UserAuthController = UserAuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)('refresh_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'identity_card_front', maxCount: 1 },
        { name: 'identity_card_back', maxCount: 1 },
        { name: 'profile_image', maxCount: 1 },
    ], (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_dto_1.UserRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "profile", null);
__decorate([
    (0, common_1.Post)('current-location'),
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "currentLocation", null);
__decorate([
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.Post)('update-profile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        user_auth_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "profileUpdate", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('mode'),
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('driver'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "changeMode", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "logout", null);
exports.UserAuthController = UserAuthController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_auth_service_1.UserAuthService])
], UserAuthController);
//# sourceMappingURL=user-auth.controller.js.map