"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = cleanObject;
exports.sanitizeUser = sanitizeUser;
function cleanObject(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== ''));
}
function sanitizeUser(user) {
    const { password, access_token, refresh_token, fcm_token, ...cleaned } = user;
    return cleaned;
}
//# sourceMappingURL=sanitize.util.js.map