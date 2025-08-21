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
var UserAuthSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../../../users/entity/user.entity");
const roles_entity_1 = require("../../../roles/entity/roles.entity");
const user_role_entity_1 = require("../../../assig-roles-user/entity/user-role.entity");
let UserAuthSeederService = UserAuthSeederService_1 = class UserAuthSeederService {
    userRepo;
    roleRepo;
    userRoleRepo;
    logger = new common_1.Logger(UserAuthSeederService_1.name);
    constructor(userRepo, roleRepo, userRoleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.userRoleRepo = userRoleRepo;
    }
    async seed() {
        await this.seedUser({
            name: 'Customer User',
            email: 'customer@gmail.com',
            password: '123456789',
            roleName: 'customer',
        });
        await this.seedUser({
            name: 'Driver User',
            email: 'driver@gmail.com',
            password: '123456789',
            roleName: 'driver',
        });
    }
    async deleteUserWithRoles(email) {
        const user = await this.userRepo.findOne({
            where: { email },
            relations: ['userRoles'],
        });
        if (!user)
            return;
        if (user.userRoles && user.userRoles.length > 0) {
            await this.userRoleRepo.remove(user.userRoles);
        }
        await this.userRepo.remove(user);
        this.logger.log(`Deleted existing user: ${email}`);
    }
    async seedUser({ name, email, password, roleName, }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (email === 'customer@gmail.com') {
            this.logger.log('customer is already added');
            return;
        }
        if (email === 'driver@gmail.com') {
            this.logger.log('Driver is already added');
            return;
        }
        const newUser = this.userRepo.create({
            name,
            email,
            password: hashedPassword,
        });
        const savedUser = await this.userRepo.save(newUser);
        const role = await this.roleRepo.findOne({
            where: { name: roleName },
            select: {
                id: true,
                name: true,
            },
        });
        if (!role) {
            this.logger.error(`Role '${roleName}' not found in roles table.`);
            return;
        }
        const userRole = this.userRoleRepo.create({
            user: savedUser,
            role: role,
        });
        await this.userRoleRepo.save(userRole);
        this.logger.log(`User ${email} created with role ${role.name}`);
    }
};
exports.UserAuthSeederService = UserAuthSeederService;
exports.UserAuthSeederService = UserAuthSeederService = UserAuthSeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserAuthSeederService);
//# sourceMappingURL=user-auth-seeder.service.js.map