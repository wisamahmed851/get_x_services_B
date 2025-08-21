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
exports.complaintsCaterory = void 0;
const admin_entity_1 = require("../../admin/entity/admin.entity");
const typeorm_1 = require("typeorm");
let complaintsCaterory = class complaintsCaterory {
    id;
    name;
    icon;
    status;
    created_at;
    updated_at;
    created_by;
    setCreateDateParts() {
        const today = new Date();
        const onlyDate = today.toISOString().split('T')[0];
        this.created_at = onlyDate;
        this.updated_at = onlyDate;
    }
    admin;
};
exports.complaintsCaterory = complaintsCaterory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], complaintsCaterory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], complaintsCaterory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], complaintsCaterory.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: 1,
        nullable: false,
        comment: '0 = inactive, 1 = active',
    }),
    __metadata("design:type", Number)
], complaintsCaterory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], complaintsCaterory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], complaintsCaterory.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], complaintsCaterory.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], complaintsCaterory.prototype, "setCreateDateParts", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", admin_entity_1.Admin)
], complaintsCaterory.prototype, "admin", void 0);
exports.complaintsCaterory = complaintsCaterory = __decorate([
    (0, typeorm_1.Entity)()
], complaintsCaterory);
//# sourceMappingURL=complaints_category.entity.js.map