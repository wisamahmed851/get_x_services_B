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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../../admin/entity/admin.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
let AdminAuthService = class AdminAuthService {
    adminRepo;
    jwtSerrvice;
    constructor(adminRepo, jwtSerrvice) {
        this.adminRepo = adminRepo;
        this.jwtSerrvice = jwtSerrvice;
    }
    async validateEmail(email, password) {
        try {
            const admin = await this.adminRepo.findOne({ where: { email } });
            if (!admin) {
                throw new common_1.BadRequestException('Invalid email or password');
            }
            const match = await bcrypt.compare(password, admin.password);
            if (!match) {
                throw new common_1.BadRequestException('Invalid email or password');
            }
            return admin;
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async login(admin) {
        try {
            const payload = { sub: admin.id, email: admin.email };
            const token = this.jwtSerrvice.sign(payload);
            admin.access_token = token;
            await this.adminRepo.save(admin);
            const { password, access_token, ...safeAdmin } = admin;
            return {
                success: true,
                message: 'Admin has been logged in successfully',
                access_token: token,
                data: safeAdmin,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Login failed');
        }
    }
    async getProfile(admin) {
        try {
            const loginAdmin = await this.adminRepo.findOne({
                where: { id: admin.id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                },
            });
            if (!loginAdmin) {
                throw new common_1.NotFoundException('Admin not found');
            }
            return {
                success: true,
                message: 'Admin profile fetched successfully',
                data: loginAdmin,
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async passwordChange(body, admin) {
        try {
            const loginAdmin = await this.adminRepo.findOne({
                where: { id: admin.id },
            });
            if (!loginAdmin) {
                throw new common_1.NotFoundException('Admin not found');
            }
            const matched = await bcrypt.compare(body.oldPassword, loginAdmin.password);
            if (!matched) {
                throw new common_1.BadRequestException('Old password is incorrect');
            }
            if (!body.newPassword || body.newPassword.trim().length < 6) {
                throw new common_1.BadRequestException('New password must be at least 6 characters');
            }
            const saltRounds = 10;
            loginAdmin.password = await bcrypt.hash(body.newPassword, saltRounds);
            await this.adminRepo.save(loginAdmin);
            return {
                success: true,
                message: 'Password has been successfully updated',
                data: {},
            };
        }
        catch (error) {
            this.handleUnknown(error);
        }
    }
    async logout(admin) {
        try {
            admin.access_token = '';
            await this.adminRepo.save(admin);
            return {
                success: true,
                message: 'Logged out successfully',
                data: {},
            };
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
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map