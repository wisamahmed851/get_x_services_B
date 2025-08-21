"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsRoles = exports.WS_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.WS_ROLES_KEY = 'ws_roles';
const WsRoles = (...roles) => (0, common_1.SetMetadata)(exports.WS_ROLES_KEY, roles);
exports.WsRoles = WsRoles;
//# sourceMappingURL=ws-roles.decorator.js.map