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
exports.PaymentMethodsController = void 0;
const common_1 = require("@nestjs/common");
const payment_methods_service_1 = require("./payment-methods.service");
const payment_method_dto_1 = require("./dtos/payment-method.dto");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../common/utils/multer.config");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entity/user.entity");
let PaymentMethodsController = class PaymentMethodsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(file, dto, user) {
        const image = file?.filename;
        return this.service.create({ ...dto, image }, user.id);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    toogleStatus(id) {
        return this.service.toogleStatus(id);
    }
    update(id, file, dto) {
        const image = file?.filename;
        return this.service.update(id, { ...dto, image });
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.PaymentMethodsController = PaymentMethodsController;
__decorate([
    (0, common_1.Post)('store'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payment_method_dto_1.CreatePaymentMethodDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('show/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('toogleStatus/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "toogleStatus", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, multer_config_1.multerConfig)('uploads'))),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, payment_method_dto_1.UpdatePaymentMethodDto]),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "remove", null);
exports.PaymentMethodsController = PaymentMethodsController = __decorate([
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    (0, common_1.Controller)('admin/payment-methods'),
    __metadata("design:paramtypes", [payment_methods_service_1.PaymentMethodsService])
], PaymentMethodsController);
//# sourceMappingURL=payment-methods.controller.js.map