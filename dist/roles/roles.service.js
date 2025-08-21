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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_entity_1 = require("./entity/roles.entity");
const typeorm_2 = require("typeorm");
let RolesService = class RolesService {
    roleRepo;
    constructor(roleRepo) {
        this.roleRepo = roleRepo;
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException ||
            err instanceof common_1.NotFoundException) {
            throw err;
        }
        throw new common_1.InternalServerErrorException('Something went wrong internally.', {
            cause: err,
        });
    }
    async create(role) {
        try {
            if (role.guard !== 'user' && role.guard !== 'admin') {
                throw new common_1.BadRequestException('Guard must be either "user" or "admin"');
            }
            const existing = await this.roleRepo.findOne({
                where: { name: role.name, guard: role.guard },
            });
            if (existing) {
                throw new common_1.BadRequestException('This role already exists under this guard');
            }
            const newRole = this.roleRepo.create(role);
            const saved = await this.roleRepo.save(newRole);
            return {
                success: true,
                message: 'Role has been created',
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async index() {
        try {
            const roles = await this.roleRepo.find({ order: { id: 'ASC' } });
            return {
                success: true,
                message: 'Roles fetched successfully',
                data: roles,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const role = await this.roleRepo.findOne({ where: { id } });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            return {
                success: true,
                message: 'Role fetched successfully',
                data: role,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(role, id) {
        try {
            if (role.guard !== 'user' && role.guard !== 'admin') {
                throw new common_1.BadRequestException('Guard must be either "user" or "admin"');
            }
            const existing = await this.roleRepo.findOne({ where: { id } });
            if (!existing) {
                throw new common_1.NotFoundException('Role not found');
            }
            const duplicateName = await this.roleRepo.findOne({
                where: { name: role.name, guard: role.guard },
            });
            if (duplicateName && duplicateName.id !== id) {
                throw new common_1.BadRequestException('Another role with this name already exists');
            }
            Object.assign(existing, role);
            const updated = await this.roleRepo.save(existing);
            return {
                success: true,
                message: 'Role updated successfully',
                data: updated,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async toogleStatus(id) {
        try {
            const role = await this.roleRepo.findOne({ where: { id } });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            role.status = role.status === 0 ? 1 : 0;
            const updated = await this.roleRepo.save(role);
            return {
                success: true,
                message: role.status === 1
                    ? 'Role has been activated'
                    : 'Role has been deactivated',
                data: updated,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map