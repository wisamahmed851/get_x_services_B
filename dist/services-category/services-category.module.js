"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const services_category_entity_1 = require("./entity/services-category.entity");
const services_category_service_1 = require("./services-category.service");
const services_category_controller_1 = require("./services-category.controller");
const services_category_users_controller_1 = require("./services-category-users.controller");
let ServicesCategoryModule = class ServicesCategoryModule {
};
exports.ServicesCategoryModule = ServicesCategoryModule;
exports.ServicesCategoryModule = ServicesCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([services_category_entity_1.ServicesCategory])],
        controllers: [services_category_controller_1.ServicesCategoryController, services_category_users_controller_1.ServicesCategoryProviderController],
        providers: [services_category_service_1.ServicesCategoryService],
    })
], ServicesCategoryModule);
//# sourceMappingURL=services-category.module.js.map