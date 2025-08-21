"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWalletModule = void 0;
const common_1 = require("@nestjs/common");
const user_wallet_controller_1 = require("./user-wallet.controller");
const user_wallet_service_1 = require("./user-wallet.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_wallet_entity_1 = require("./entity/user-wallet.entity");
const user_entity_1 = require("../users/entity/user.entity");
let UserWalletModule = class UserWalletModule {
};
exports.UserWalletModule = UserWalletModule;
exports.UserWalletModule = UserWalletModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_wallet_entity_1.UserWallet, user_entity_1.User])],
        controllers: [user_wallet_controller_1.UserWalletController],
        providers: [user_wallet_service_1.UserWalletService]
    })
], UserWalletModule);
//# sourceMappingURL=user-wallet.module.js.map