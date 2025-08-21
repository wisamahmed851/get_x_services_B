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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let CityController = class CityController {
    cityService;
    constructor(cityService) {
        this.cityService = cityService;
    }
    createCity(name, created_by) {
        return this.cityService.createCity(name, created_by);
    }
    getAllCities() {
        return this.cityService.getAllCities();
    }
    getCityById(id) {
        return this.cityService.getCityById(id);
    }
    updateCity(id, name) {
        return this.cityService.updateCity(id, name);
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "createCity", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CityController.prototype, "getAllCities", null);
__decorate([
    (0, common_1.Get)('show/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "getCityById", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CityController.prototype, "updateCity", null);
exports.CityController = CityController = __decorate([
    (0, common_1.Controller)('admin/city'),
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map