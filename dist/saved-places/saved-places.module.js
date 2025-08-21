"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedPlacesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const saved_place_entity_1 = require("./entity/saved-place.entity");
const saved_places_service_1 = require("./saved-places.service");
const saved_places_controller_1 = require("./saved-places.controller");
const user_entity_1 = require("../users/entity/user.entity");
const saved_places_admin_controller_1 = require("./saved-places-admin.controller");
const admin_entity_1 = require("../admin/entity/admin.entity");
let SavedPlacesModule = class SavedPlacesModule {
};
exports.SavedPlacesModule = SavedPlacesModule;
exports.SavedPlacesModule = SavedPlacesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([saved_place_entity_1.SavedPlace, user_entity_1.User, admin_entity_1.Admin])],
        providers: [saved_places_service_1.SavedPlacesService],
        controllers: [saved_places_controller_1.SavedPlacesController, saved_places_admin_controller_1.SavedPlacesAdminController],
    })
], SavedPlacesModule);
//# sourceMappingURL=saved-places.module.js.map