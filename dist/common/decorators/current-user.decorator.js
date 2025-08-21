"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentAdmin = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});
exports.CurrentAdmin = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const admin = request.user;
    return data ? admin?.[data] : admin;
});
//# sourceMappingURL=current-user.decorator.js.map