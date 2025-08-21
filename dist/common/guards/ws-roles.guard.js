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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const ws_roles_decorator_1 = require("../decorators/ws-roles.decorator");
let WsRolesGuard = class WsRolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const roles = this.reflector.get(ws_roles_decorator_1.WS_ROLES_KEY, context.getHandler());
        if (!roles)
            return true;
        const client = context.switchToWs().getClient();
        const userRoles = client.data.user?.roles || [];
        const hasRole = userRoles.some((role) => roles.includes(role));
        if (!hasRole)
            throw new common_1.ForbiddenException('Access Denied: Insufficient role');
        return true;
    }
};
exports.WsRolesGuard = WsRolesGuard;
exports.WsRolesGuard = WsRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], WsRolesGuard);
//# sourceMappingURL=ws-roles.guard.js.map