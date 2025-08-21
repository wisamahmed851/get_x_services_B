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
exports.City = void 0;
const admin_entity_1 = require("../../admin/entity/admin.entity");
const user_entity_1 = require("../../users/entity/user.entity");
const typeorm_1 = require("typeorm");
let City = class City {
    id;
    name;
    created_by;
    admin;
    users;
    created_at;
    updated_at;
    setCreateDateParts() {
        const today = new Date();
        const onlyDate = today.toISOString().split('T')[0];
        this.created_at = onlyDate;
        this.updated_at = onlyDate;
    }
};
exports.City = City;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], City.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], City.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", admin_entity_1.Admin)
], City.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.city),
    __metadata("design:type", Array)
], City.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], City.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], City.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], City.prototype, "setCreateDateParts", null);
exports.City = City = __decorate([
    (0, typeorm_1.Entity)({ name: "cities" })
], City);
//# sourceMappingURL=city.entity.js.map