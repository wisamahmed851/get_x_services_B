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
exports.AdminPermission = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../../admin/entity/admin.entity");
const permission_entity_1 = require("../../permissions/entity/permission.entity");
let AdminPermission = class AdminPermission {
    id;
    admin_id;
    admin;
    permission_id;
    permission;
    status;
    created_at;
    updated_at;
    setCreateDateParts() {
        const today = new Date().toISOString().split('T')[0];
        this.created_at = today;
        this.updated_at = today;
    }
};
exports.AdminPermission = AdminPermission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AdminPermission.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], AdminPermission.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AdminPermission.prototype, "permission_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permission_entity_1.Permission, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'permission_id' }),
    __metadata("design:type", permission_entity_1.Permission)
], AdminPermission.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: 1,
        nullable: false,
        comment: '0 = inactive, 1 = active',
    }),
    __metadata("design:type", Number)
], AdminPermission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AdminPermission.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AdminPermission.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPermission.prototype, "setCreateDateParts", null);
exports.AdminPermission = AdminPermission = __decorate([
    (0, typeorm_1.Entity)({ name: 'admin_permissions' }),
    (0, typeorm_1.Index)(['admin_id', 'permission_id'], { unique: true })
], AdminPermission);
//# sourceMappingURL=admin-permission.entity.js.map