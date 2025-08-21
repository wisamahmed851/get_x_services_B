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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_dto_1 = require("./dtos/users.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../common/utils/multer.config");
const user_details_dto_1 = require("./dtos/user_details.dto");
const user_jwt_guard_1 = require("../auth/user/user-jwt.guard");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    Store(user, file) {
        const image = file?.filename;
        return this.userService.storeUser({ ...user, image });
    }
    idnex() {
        return this.userService.idnex();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    findOneByEmail(data) {
        console.log(data.email);
        return this.userService.findOnByEmail(data.email);
    }
    update(id, user, file) {
        const image = file?.filename;
        return this.userService.updateUser(id, { ...user, image });
    }
    statusChange(id) {
        return this.userService.statusUpdate(id);
    }
    userDetailsStore(data, files, req) {
        const identity_card_front_url = files.identity_card_front?.[0]?.path;
        const identity_card_back_url = files.identity_card_back?.[0]?.path;
        if (identity_card_front_url) {
            data.identity_card_front_url = identity_card_front_url;
        }
        if (identity_card_back_url) {
            data.identity_card_back_url = identity_card_back_url;
        }
        return this.userService.create_user_details(data, req.user);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('store'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "Store", null);
__decorate([
    (0, common_1.Get)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "idnex", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('findOnebyEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOneByEmail", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('toogleStatus/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "statusChange", null);
__decorate([
    (0, common_1.Post)('detailsCreate'),
    (0, common_1.UseGuards)(user_jwt_guard_1.UserJwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'identity_card_front', maxCount: 1 },
        { name: 'identity_card_back', maxCount: 1 },
    ], (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_details_dto_1.UserDetailsDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userDetailsStore", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('admin/users'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map