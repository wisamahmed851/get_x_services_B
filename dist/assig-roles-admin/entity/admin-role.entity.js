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
exports.AdminRole = void 0;
const typeorm_1 = require("typeorm");
const roles_entity_1 = require("../../roles/entity/roles.entity");
const admin_entity_1 = require("../../admin/entity/admin.entity");
let AdminRole = class AdminRole {
    id;
    admin_id;
    role_id;
    admin;
    role;
    status;
    created_at;
    updated_at;
    setCreateDateParts() {
        const today = new Date();
        const onlyDate = today.toISOString().split('T')[0];
        this.created_at = onlyDate;
        this.updated_at = onlyDate;
    }
};
exports.AdminRole = AdminRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AdminRole.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AdminRole.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", admin_entity_1.Admin)
], AdminRole.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roles_entity_1.Role, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", roles_entity_1.Role)
], AdminRole.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: 1,
        nullable: false,
        comment: '0 = inactive, 1 = active',
    }),
    __metadata("design:type", Number)
], AdminRole.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AdminRole.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AdminRole.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminRole.prototype, "setCreateDateParts", null);
exports.AdminRole = AdminRole = __decorate([
    (0, typeorm_1.Entity)()
], AdminRole);
//# sourceMappingURL=admin-role.entity.js.map