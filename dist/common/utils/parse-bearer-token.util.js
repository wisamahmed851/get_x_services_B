"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBearerToken = parseBearerToken;
function parseBearerToken(raw) {
    if (!raw || typeof raw !== 'string')
        return null;
    return raw.startsWith('Bearer ') ? raw.slice(7).trim() : raw.trim();
}
//# sourceMappingURL=parse-bearer-token.util.js.map