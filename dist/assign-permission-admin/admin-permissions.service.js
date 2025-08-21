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
exports.AdminPermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_permission_entity_1 = require("./entity/admin-permission.entity");
const admin_entity_1 = require("../admin/entity/admin.entity");
const permission_entity_1 = require("../permissions/entity/permission.entity");
let AdminPermissionsService = class AdminPermissionsService {
    adminPermissionRepo;
    adminRepo;
    permissionRepo;
    constructor(adminPermissionRepo, adminRepo, permissionRepo) {
        this.adminPermissionRepo = adminPermissionRepo;
        this.adminRepo = adminRepo;
        this.permissionRepo = permissionRepo;
    }
    async create(dto) {
        try {
            const admin = await this.adminRepo.findOne({
                where: { id: dto.admin_id },
            });
            if (!admin)
                throw new common_1.BadRequestException('Invalid admin_id');
            const permission = await this.permissionRepo.findOne({
                where: { id: dto.permission_id },
            });
            if (!permission)
                throw new common_1.BadRequestException('Invalid permission_id');
            if (permission.guard !== 'admin')
                throw new common_1.BadRequestException('Permission must be for admin guard only');
            const duplicate = await this.adminPermissionRepo.findOne({
                where: { admin_id: dto.admin_id, permission_id: dto.permission_id },
            });
            if (duplicate)
                throw new common_1.BadRequestException('This admin already has that permission');
            const saved = await this.adminPermissionRepo.save(this.adminPermissionRepo.create(dto));
            return {
                success: true,
                message: 'Admin permission assigned successfully',
                data: saved,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async findAll() {
        try {
            const records = await this.adminPermissionRepo.find({
                relations: ['admin', 'permission'],
            });
            return {
                success: true,
                message: 'Admin permissions list fetched successfully',
                data: records,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async findOne(id) {
        try {
            const record = await this.adminPermissionRepo.findOne({
                where: { id },
                relations: ['admin', 'permission'],
            });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            return {
                success: true,
                message: 'Admin permission fetched successfully',
                data: record,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async update(id, dto) {
        try {
            const existing = await this.adminPermissionRepo.findOne({
                where: { id },
            });
            if (!existing)
                throw new common_1.NotFoundException('Admin permission assignment not found');
            if (dto.admin_id) {
                const admin = await this.adminRepo.findOne({
                    where: { id: dto.admin_id },
                });
                if (!admin)
                    throw new common_1.BadRequestException('Invalid admin_id');
                existing.admin_id = dto.admin_id;
                existing.admin = admin;
            }
            if (dto.permission_id) {
                const permission = await this.permissionRepo.findOne({
                    where: { id: dto.permission_id },
                });
                if (!permission)
                    throw new common_1.BadRequestException('Invalid permission_id');
                if (permission.guard !== 'admin')
                    throw new common_1.BadRequestException('Permission must be for admin guard only');
                existing.permission_id = dto.permission_id;
                existing.permission = permission;
            }
            const collision = await this.adminPermissionRepo.findOne({
                where: {
                    id: (0, typeorm_2.Not)(id),
                    admin_id: existing.admin_id,
                    permission_id: existing.permission_id,
                },
            });
            if (collision)
                throw new common_1.BadRequestException('Another record already has that pair');
            await this.adminPermissionRepo.save(existing);
            const updated = await this.adminPermissionRepo.findOne({
                where: { id },
                relations: ['admin', 'permission'],
            });
            return {
                success: true,
                message: 'Admin permission updated successfully',
                data: updated,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async remove(id) {
        try {
            const record = await this.adminPermissionRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            await this.adminPermissionRepo.remove(record);
            return {
                success: true,
                message: 'Admin permission deleted successfully',
                data: [],
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async toggleStatus(id) {
        try {
            const record = await this.adminPermissionRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            record.status = record.status === 0 ? 1 : 0;
            const updated = await this.adminPermissionRepo.save(record);
            const message = updated.status === 1
                ? 'Admin permission activated successfully'
                : 'Admin permission deactivated successfully';
            return { success: true, message, data: updated };
        }
        catch (error) {
            this.handleUnknown(error);
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
exports.AdminPermissionsService = AdminPermissionsService;
exports.AdminPermissionsService = AdminPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_permission_entity_1.AdminPermission)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminPermissionsService);
//# sourceMappingURL=admin-permissions.service.js.map