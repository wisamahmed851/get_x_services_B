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
var AdminAuthSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const admin_entity_1 = require("../entity/admin.entity");
const roles_entity_1 = require("../../roles/entity/roles.entity");
const admin_role_entity_1 = require("../../assig-roles-admin/entity/admin-role.entity");
let AdminAuthSeederService = AdminAuthSeederService_1 = class AdminAuthSeederService {
    adminRepository;
    roleRepo;
    adminRolerepo;
    logger = new common_1.Logger(AdminAuthSeederService_1.name);
    constructor(adminRepository, roleRepo, adminRolerepo) {
        this.adminRepository = adminRepository;
        this.roleRepo = roleRepo;
        this.adminRolerepo = adminRolerepo;
    }
    async seed() {
        const adminExists = await this.adminRepository.findOne({
            where: { email: 'admin@gmail.com' },
        });
        if (adminExists) {
            this.logger.log('Admin already exists. Skipping seeding.');
            return;
        }
        const hashedPassword = await bcrypt.hash('123456789', 10);
        const admin = this.adminRepository.create({
            name: 'Super Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            status: 1,
        });
        await this.adminRepository.save(admin);
        const role = await this.roleRepo.findOne({
            where: { name: 'admin' },
            select: { id: true, name: true },
        });
        if (!role) {
            this.logger.error(`Role admin not found in roles table.`);
            return;
        }
        const adminRole = this.adminRolerepo.create({
            admin_id: admin.id,
            role_id: role.id,
            admin: admin,
            role: role,
        });
        const savedadme = await this.adminRolerepo.save(adminRole);
        this.logger.log("Admin Is successfully created");
        this.logger.log(savedadme);
    }
};
exports.AdminAuthSeederService = AdminAuthSeederService;
exports.AdminAuthSeederService = AdminAuthSeederService = AdminAuthSeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_role_entity_1.AdminRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminAuthSeederService);
//# sourceMappingURL=admin-auth-seeder.service.js.map