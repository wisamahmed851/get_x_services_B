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
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entity/admin.entity");
const roles_entity_1 = require("../roles/entity/roles.entity");
const bcrypt = require("bcryptjs");
let AdminsService = class AdminsService {
    adminRepo;
    roleRepo;
    constructor(adminRepo, roleRepo) {
        this.adminRepo = adminRepo;
        this.roleRepo = roleRepo;
    }
    async create(dto, image) {
        try {
            const existing = await this.adminRepo.findOne({
                where: { email: dto.email },
            });
            if (existing)
                throw new common_1.BadRequestException('User with this email already exists');
            if (dto.password) {
                dto.password = await bcrypt.hash(dto.password, 10);
            }
            if (!dto.image)
                dto.image = image;
            const saved = await this.adminRepo.save(this.adminRepo.create(dto));
            const { password, access_token, ...clean } = saved;
            return {
                success: true,
                message: 'Admin has been created',
                data: clean,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll() {
        try {
            const admins = await this.adminRepo.find();
            if (!admins.length)
                throw new common_1.NotFoundException('Admin list is empty');
            const data = admins.map(({ password, access_token, ...rest }) => rest);
            return { success: true, message: 'Admins fetched', data };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async allAvtive() {
        try {
            const admins = await this.adminRepo.find({ where: { status: 1 } });
            const data = admins.map(({ password, access_token, ...rest }) => rest);
            return { success: true, message: 'Active admins fetched', data };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin)
                throw new common_1.NotFoundException('Admin not found');
            const { password, access_token, ...clean } = admin;
            return { success: true, message: 'Admin fetched', data: clean };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, dto) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin)
                throw new common_1.NotFoundException('Admin not found');
            if (dto.email) {
                const duplicate = await this.adminRepo.findOne({
                    where: { id: (0, typeorm_2.Not)(id), email: dto.email },
                });
                if (duplicate)
                    throw new common_1.BadRequestException('Email already in use by another admin');
            }
            if (dto.password)
                dto.password = await bcrypt.hash(dto.password, 10);
            if (!dto.image)
                dto.image = admin.image;
            Object.assign(admin, dto);
            const saved = await this.adminRepo.save(admin);
            const { password, access_token, ...clean } = saved;
            return { success: true, message: 'Admin updated', data: clean };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin)
                throw new common_1.BadRequestException('Admin not found');
            await this.adminRepo.remove(admin);
            return { success: true, message: 'Admin deleted', data: [] };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async statusUpdate(id) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin)
                throw new common_1.BadRequestException('Admin not found');
            admin.status = admin.status === 0 ? 1 : 0;
            const saved = await this.adminRepo.save(admin);
            const { password, access_token, ...clean } = saved;
            const msg = saved.status === 1
                ? 'User has been activated'
                : 'User has been deactivated';
            return { success: true, message: msg, data: clean };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException ||
            err instanceof common_1.NotFoundException) {
            throw err;
        }
        throw new common_1.InternalServerErrorException('Unexpected error', {
            cause: err,
        });
    }
};
exports.AdminsService = AdminsService;
exports.AdminsService = AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdminsService);
//# sourceMappingURL=admin.service.js.map