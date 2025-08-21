"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintsCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const complaints_category_controller_1 = require("./complaints-category.controller");
const complaints_category_service_1 = require("./complaints-category.service");
const typeorm_1 = require("@nestjs/typeorm");
const complaints_category_entity_1 = require("./entity/complaints_category.entity");
const admin_entity_1 = require("../admin/entity/admin.entity");
let ComplaintsCategoryModule = class ComplaintsCategoryModule {
};
exports.ComplaintsCategoryModule = ComplaintsCategoryModule;
exports.ComplaintsCategoryModule = ComplaintsCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([complaints_category_entity_1.complaintsCaterory, admin_entity_1.Admin])],
        controllers: [complaints_category_controller_1.ComplaintsCategoryController],
        providers: [complaints_category_service_1.ComplaintsCategoryService]
    })
], ComplaintsCategoryModule);
//# sourceMappingURL=complaints-category.module.js.map