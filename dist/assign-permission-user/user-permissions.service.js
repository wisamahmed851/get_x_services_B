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
exports.UserPermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_permission_entity_1 = require("./entity/user-permission.entity");
const user_entity_1 = require("../users/entity/user.entity");
const permission_entity_1 = require("../permissions/entity/permission.entity");
let UserPermissionsService = class UserPermissionsService {
    userPermissionRepo;
    userRepo;
    permissionRepo;
    constructor(userPermissionRepo, userRepo, permissionRepo) {
        this.userPermissionRepo = userPermissionRepo;
        this.userRepo = userRepo;
        this.permissionRepo = permissionRepo;
    }
    async create(dto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
            if (!user)
                throw new common_1.BadRequestException('Invalid user_id');
            const permission = await this.permissionRepo.findOne({
                where: { id: dto.permission_id },
            });
            if (!permission)
                throw new common_1.BadRequestException('Invalid permission_id');
            if (permission.guard !== 'user')
                throw new common_1.BadRequestException('Permission must be for user guard only');
            const duplicate = await this.userPermissionRepo.findOne({
                where: { user_id: dto.user_id, permission_id: dto.permission_id },
            });
            if (duplicate)
                throw new common_1.BadRequestException('This user already has that permission');
            const saved = await this.userPermissionRepo.save(this.userPermissionRepo.create(dto));
            return {
                success: true,
                message: 'User permission assigned successfully',
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll() {
        try {
            const records = await this.userPermissionRepo.find({
                relations: ['user', 'permission'],
            });
            return {
                success: true,
                message: 'User permissions list fetched successfully',
                data: records,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const record = await this.userPermissionRepo.findOne({
                where: { id },
                relations: ['user', 'permission'],
            });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            return {
                success: true,
                message: 'User permission fetched successfully',
                data: record,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, dto) {
        try {
            const existing = await this.userPermissionRepo.findOne({ where: { id } });
            if (!existing)
                throw new common_1.NotFoundException('User permission assignment not found');
            if (dto.user_id) {
                const user = await this.userRepo.findOne({
                    where: { id: dto.user_id },
                });
                if (!user)
                    throw new common_1.BadRequestException('Invalid user_id');
                existing.user_id = dto.user_id;
                existing.user = user;
            }
            if (dto.permission_id) {
                const permission = await this.permissionRepo.findOne({
                    where: { id: dto.permission_id },
                });
                if (!permission)
                    throw new common_1.BadRequestException('Invalid permission_id');
                if (permission.guard !== 'user')
                    throw new common_1.BadRequestException('Permission must be for user guard only');
                existing.permission_id = dto.permission_id;
                existing.permission = permission;
            }
            const collision = await this.userPermissionRepo.findOne({
                where: {
                    id: (0, typeorm_2.Not)(id),
                    user_id: existing.user_id,
                    permission_id: existing.permission_id,
                },
            });
            if (collision)
                throw new common_1.BadRequestException('Another record already has that pair');
            await this.userPermissionRepo.save(existing);
            const updated = await this.userPermissionRepo.findOne({
                where: { id },
                relations: ['user', 'permission'],
            });
            return {
                success: true,
                message: 'User permission updated successfully',
                data: updated,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async toggleStatus(id) {
        try {
            const record = await this.userPermissionRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            record.status = record.status === 0 ? 1 : 0;
            const updated = await this.userPermissionRepo.save(record);
            const message = updated.status === 1
                ? 'User permission activated successfully'
                : 'User permission deactivated successfully';
            return { success: true, message, data: updated };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id) {
        try {
            const record = await this.userPermissionRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            await this.userPermissionRepo.remove(record);
            return {
                success: true,
                message: 'User permission deleted successfully',
                data: [],
            };
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
exports.UserPermissionsService = UserPermissionsService;
exports.UserPermissionsService = UserPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_permission_entity_1.UserPermission)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserPermissionsService);
//# sourceMappingURL=user-permissions.service.js.map