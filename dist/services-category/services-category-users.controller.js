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
exports.ServicesCategoryProviderController = void 0;
const common_1 = require("@nestjs/common");
const services_category_service_1 = require("./services-category.service");
let ServicesCategoryProviderController = class ServicesCategoryProviderController {
    servicesCategoryService;
    constructor(servicesCategoryService) {
        this.servicesCategoryService = servicesCategoryService;
    }
    async getAllCategories(limit, offset, page) {
        return this.servicesCategoryService.findAllForList(limit, offset, page);
    }
};
exports.ServicesCategoryProviderController = ServicesCategoryProviderController;
__decorate([
    (0, common_1.Get)("index"),
    __param(0, (0, common_1.Query)("limit")),
    __param(1, (0, common_1.Query)("offset")),
    __param(2, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ServicesCategoryProviderController.prototype, "getAllCategories", null);
exports.ServicesCategoryProviderController = ServicesCategoryProviderController = __decorate([
    (0, common_1.Controller)('user/services-category'),
    __metadata("design:paramtypes", [services_category_service_1.ServicesCategoryService])
], ServicesCategoryProviderController);
//# sourceMappingURL=services-category-users.controller.js.map