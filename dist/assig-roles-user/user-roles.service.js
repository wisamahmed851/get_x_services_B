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
exports.UserRolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("../roles/entity/roles.entity");
const user_entity_1 = require("../users/entity/user.entity");
const user_role_entity_1 = require("./entity/user-role.entity");
let UserRolesService = class UserRolesService {
    userRoleRepo;
    userRepo;
    roleRepo;
    constructor(userRoleRepo, userRepo, roleRepo) {
        this.userRoleRepo = userRoleRepo;
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }
    async create(dto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
            if (!user)
                throw new common_1.BadRequestException('Invalid user_id');
            const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
            if (!role)
                throw new common_1.BadRequestException('Invalid role_id');
            if (role.guard !== 'user')
                throw new common_1.BadRequestException('Role must be for user guard only');
            const duplicate = await this.userRoleRepo.findOne({
                where: { user_id: dto.user_id, role_id: dto.role_id },
            });
            if (duplicate)
                throw new common_1.BadRequestException('This user already has that role');
            const saved = await this.userRoleRepo.save(this.userRoleRepo.create(dto));
            const record = await this.userRoleRepo.findOne({
                where: { id: saved.id },
                relations: ['user', 'role'],
            });
            return { success: true, message: 'Role assigned to user', data: record };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll() {
        try {
            const list = await this.userRoleRepo.find({
                relations: ['user', 'role'],
            });
            return { success: true, message: 'User roles fetched', data: list };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const record = await this.userRoleRepo.findOne({
                where: { id },
                relations: ['user', 'role'],
            });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            return { success: true, message: 'User role fetched', data: record };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, dto) {
        try {
            const existing = await this.userRoleRepo.findOne({ where: { id } });
            if (!existing)
                throw new common_1.NotFoundException('User role assignment not found');
            if (dto.user_id) {
                const user = await this.userRepo.findOne({
                    where: { id: dto.user_id },
                });
                if (!user)
                    throw new common_1.BadRequestException('Invalid user_id');
                existing.user_id = dto.user_id;
                existing.user = user;
            }
            if (dto.role_id) {
                const role = await this.roleRepo.findOne({
                    where: { id: dto.role_id },
                });
                if (!role)
                    throw new common_1.BadRequestException('Invalid role_id');
                if (role.guard !== 'user')
                    throw new common_1.BadRequestException('Role must be for user guard only');
                existing.role_id = dto.role_id;
                existing.role = role;
            }
            const collision = await this.userRoleRepo.findOne({
                where: {
                    id: (0, typeorm_2.Not)(id),
                    user_id: existing.user_id,
                    role_id: existing.role_id,
                },
            });
            if (collision)
                throw new common_1.BadRequestException('Another record already has that pair');
            await this.userRoleRepo.save(existing);
            return {
                success: true,
                message: 'User role updated',
                data: (await this.findOne(id)).data,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async toggleStatus(id) {
        try {
            const record = await this.userRoleRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            record.status = record.status === 0 ? 1 : 0;
            const saved = await this.userRoleRepo.save(record);
            const msg = saved.status === 1 ? 'User role activated' : 'User role deactivated';
            return { success: true, message: msg, data: saved };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id) {
        try {
            const record = await this.userRoleRepo.findOne({ where: { id } });
            if (!record)
                throw new common_1.NotFoundException('Record not found');
            await this.userRoleRepo.remove(record);
            return { success: true, message: 'User role deleted', data: [] };
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
exports.UserRolesService = UserRolesService;
exports.UserRolesService = UserRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserRolesService);
//# sourceMappingURL=user-roles.service.js.map