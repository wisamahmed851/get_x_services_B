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
exports.RolePermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_permission_entity_1 = require("./entity/role-permission.entity");
const roles_entity_1 = require("../roles/entity/roles.entity");
const permission_entity_1 = require("../permissions/entity/permission.entity");
let RolePermissionsService = class RolePermissionsService {
    rolePermissionRepo;
    roleRepo;
    permissionRepo;
    constructor(rolePermissionRepo, roleRepo, permissionRepo) {
        this.rolePermissionRepo = rolePermissionRepo;
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
    }
    async create(dto) {
        try {
            const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
            if (!role)
                throw new common_1.BadRequestException('Invalid role_id');
            const permission = await this.permissionRepo.findOne({
                where: { id: dto.permission_id },
            });
            if (!permission)
                throw new common_1.BadRequestException('Invalid permission_id');
            if (role.guard !== permission.guard) {
                throw new common_1.BadRequestException(`You can't assign a "${permission.guard}" permission to a "${role.guard}" role`);
            }
            const duplicate = await this.rolePermissionRepo.findOne({
                where: { role_id: dto.role_id, permission_id: dto.permission_id },
            });
            if (duplicate) {
                throw new common_1.BadRequestException('This role already has that permission assigned');
            }
            const rolePermission = this.rolePermissionRepo.create(dto);
            const saved = await this.rolePermissionRepo.save(rolePermission);
            return {
                success: true,
                message: 'Role permission assigned',
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll() {
        try {
            const list = await this.rolePermissionRepo.find();
            if (!list.length)
                throw new common_1.NotFoundException('No role–permission links found');
            return {
                success: true,
                message: 'Role permissions fetched',
                data: list,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const record = await this.rolePermissionRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            return {
                success: true,
                message: 'Role permission fetched',
                data: record,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, dto) {
        try {
            const existing = await this.rolePermissionRepo.findOne({ where: { id } });
            if (!existing)
                throw new common_1.NotFoundException('RolePermission not found');
            const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
            if (!role)
                throw new common_1.BadRequestException('Invalid role_id');
            const permission = await this.permissionRepo.findOne({
                where: { id: dto.permission_id },
            });
            if (!permission)
                throw new common_1.BadRequestException('Invalid permission_id');
            if (role.guard !== permission.guard) {
                throw new common_1.BadRequestException(`You can't assign a "${permission.guard}" permission to a "${role.guard}" role`);
            }
            const duplicate = await this.rolePermissionRepo.findOne({
                where: {
                    id: (0, typeorm_2.Not)(id),
                    role_id: dto.role_id,
                    permission_id: dto.permission_id,
                },
            });
            if (duplicate) {
                throw new common_1.BadRequestException('Another record already uses that role & permission pair');
            }
            existing.role_id = dto.role_id;
            existing.permission_id = dto.permission_id;
            existing.role = role;
            existing.permission = permission;
            await this.rolePermissionRepo.save(existing);
            return this.rolePermissionRepo.findOne({
                where: { id },
                relations: ['role', 'permission'],
            });
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async toogleStatus(id) {
        try {
            const record = await this.rolePermissionRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            record.status = record.status === 1 ? 0 : 1;
            const saved = await this.rolePermissionRepo.save(record);
            return {
                success: true,
                message: saved.status === 1
                    ? 'Role permission activated'
                    : 'Role permission deactivated',
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id) {
        try {
            const record = await this.rolePermissionRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            return await this.rolePermissionRepo.remove(record);
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
exports.RolePermissionsService = RolePermissionsService;
exports.RolePermissionsService = RolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermissions)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolePermissionsService);
//# sourceMappingURL=role-permissions.service.js.map