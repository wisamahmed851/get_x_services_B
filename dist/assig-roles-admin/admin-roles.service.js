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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("../roles/entity/roles.entity");
const admin_role_entity_1 = require("./entity/admin-role.entity");
const admin_entity_1 = require("../admin/entity/admin.entity");
let AdminRolesService = class AdminRolesService {
    adminRoleRepo;
    adminRepo;
    roleRepo;
    constructor(adminRoleRepo, adminRepo, roleRepo) {
        this.adminRoleRepo = adminRoleRepo;
        this.adminRepo = adminRepo;
        this.roleRepo = roleRepo;
    }
    async create(dto) {
        try {
            const admin = await this.adminRepo.findOne({
                where: { id: dto.admin_id },
            });
            if (!admin)
                throw new common_1.BadRequestException('Invalid admin_id');
            const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
            if (!role)
                throw new common_1.BadRequestException('Invalid role_id');
            if (role.guard !== 'admin')
                throw new common_1.BadRequestException('Role must be for admin guard only');
            const duplicate = await this.adminRoleRepo.findOne({
                where: { admin_id: dto.admin_id, role_id: dto.role_id },
            });
            if (duplicate)
                throw new common_1.BadRequestException('This admin already has that role');
            const saved = await this.adminRoleRepo.save(this.adminRoleRepo.create(dto));
            const record = await this.adminRoleRepo.findOne({
                where: { id: saved.id },
                relations: ['admin', 'role'],
            });
            return {
                success: true,
                message: 'Role assigned to admin',
                data: record,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll() {
        try {
            const list = await this.adminRoleRepo.find({
                relations: ['admin', 'role'],
            });
            return { success: true, message: 'Admin roles fetched', data: list };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const record = await this.adminRoleRepo.findOne({
                where: { id },
                relations: ['admin', 'role'],
            });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            return { success: true, message: 'Admin role fetched', data: record };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, dto) {
        try {
            const existing = await this.adminRoleRepo.findOne({ where: { id } });
            if (!existing)
                throw new common_1.NotFoundException('Admin role assignment not found');
            if (dto.admin_id) {
                const admin = await this.adminRepo.findOne({
                    where: { id: dto.admin_id },
                });
                if (!admin)
                    throw new common_1.BadRequestException('Invalid admin_id');
                existing.admin_id = dto.admin_id;
                existing.admin = admin;
            }
            if (dto.role_id) {
                const role = await this.roleRepo.findOne({
                    where: { id: dto.role_id },
                });
                if (!role)
                    throw new common_1.BadRequestException('Invalid role_id');
                if (role.guard !== 'admin')
                    throw new common_1.BadRequestException('Role must be for admin guard only');
                existing.role_id = dto.role_id;
                existing.role = role;
            }
            const collision = await this.adminRoleRepo.findOne({
                where: {
                    id: (0, typeorm_2.Not)(id),
                    admin_id: existing.admin_id,
                    role_id: existing.role_id,
                },
            });
            if (collision)
                throw new common_1.BadRequestException('Another record already has that pair');
            await this.adminRoleRepo.save(existing);
            const updated = await this.findOne(id);
            return {
                success: true,
                message: 'Admin role updated',
                data: updated.data,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id) {
        try {
            const record = await this.adminRoleRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            await this.adminRoleRepo.remove(record);
            return { success: true, message: 'Admin role deleted', data: [] };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async toogleStatus(id) {
        try {
            const record = await this.adminRoleRepo.findOne({
                where: { id },
            });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            record.status = record.status === 1 ? 0 : 1;
            await this.adminRoleRepo.save(record);
            const message = record.status === 1
                ? 'Admin Role is Activated'
                : 'Admin Role is Inactivated';
            return { success: true, message: message, data: record };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException || err instanceof common_1.NotFoundException)
            throw err;
        throw new common_1.InternalServerErrorException('Unexpected error', {
            cause: err,
        });
    }
};
exports.AdminRolesService = AdminRolesService;
exports.AdminRolesService = AdminRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_role_entity_1.AdminRole)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminRolesService);
//# sourceMappingURL=admin-roles.service.js.map