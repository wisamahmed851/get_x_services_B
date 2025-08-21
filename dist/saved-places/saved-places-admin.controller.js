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
exports.SavedPlacesAdminController = void 0;
const common_1 = require("@nestjs/common");
const saved_places_service_1 = require("./saved-places.service");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const admin_jwt_guard_1 = require("../auth/admin/admin-jwt.guard");
const admin_entity_1 = require("../admin/entity/admin.entity");
let SavedPlacesAdminController = class SavedPlacesAdminController {
    savedService;
    constructor(savedService) {
        this.savedService = savedService;
    }
    async findAllForAdmin(admin, userId) {
        if (!userId) {
            return this.savedService.findAllForAdmin(admin.id);
        }
        return this.savedService.findAllForAdmin(admin.id, userId);
    }
};
exports.SavedPlacesAdminController = SavedPlacesAdminController;
__decorate([
    (0, common_1.Get)('listAll'),
    __param(0, (0, current_user_decorator_1.CurrentAdmin)()),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_entity_1.Admin, Number]),
    __metadata("design:returntype", Promise)
], SavedPlacesAdminController.prototype, "findAllForAdmin", null);
exports.SavedPlacesAdminController = SavedPlacesAdminController = __decorate([
    (0, common_1.UseGuards)(admin_jwt_guard_1.AdminJwtAuthGuard),
    (0, common_1.Controller)('admin/saved-places'),
    __metadata("design:paramtypes", [saved_places_service_1.SavedPlacesService])
], SavedPlacesAdminController);
//# sourceMappingURL=saved-places-admin.controller.js.map