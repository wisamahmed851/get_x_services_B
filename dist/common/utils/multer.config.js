"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const multerConfig = (destination) => ({
    storage: (0, multer_1.diskStorage)({
        destination: (0, path_1.resolve)(process.cwd(), destination),
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = (0, path_1.extname)(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            cb(null, filename);
        },
    }),
});
exports.multerConfig = multerConfig;
//# sourceMappingURL=multer.config.js.map