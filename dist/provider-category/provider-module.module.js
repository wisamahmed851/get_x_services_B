"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const provider_category_entity_1 = require("./entity/provider-category.entity");
const provider_category_service_1 = require("./provider-category.service");
const provider_category_controller_1 = require("./provider-category.controller");
const user_entity_1 = require("../users/entity/user.entity");
const services_category_entity_1 = require("../services-category/entity/services-category.entity");
let ProviderCategoryModule = class ProviderCategoryModule {
};
exports.ProviderCategoryModule = ProviderCategoryModule;
exports.ProviderCategoryModule = ProviderCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([provider_category_entity_1.ProviderCategory, user_entity_1.User, services_category_entity_1.ServicesCategory])],
        controllers: [provider_category_controller_1.ProviderCategoryController],
        providers: [provider_category_service_1.ProviderCategoryService],
        exports: [provider_category_service_1.ProviderCategoryService],
    })
], ProviderCategoryModule);
//# sourceMappingURL=provider-module.module.js.map