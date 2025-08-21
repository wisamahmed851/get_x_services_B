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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const user_details_entity_1 = require("./entity/user_details.entity");
const bcrypt = require("bcryptjs");
const roles_entity_1 = require("../roles/entity/roles.entity");
const user_role_entity_1 = require("../assig-roles-user/entity/user-role.entity");
const city_entity_1 = require("../city/entity/city.entity");
const zone_entity_1 = require("../zone/entity/zone.entity");
let UsersService = class UsersService {
    userRepository;
    userDetailsRepository;
    roleRepo;
    userRoleRepo;
    cityRepo;
    zoneRepo;
    constructor(userRepository, userDetailsRepository, roleRepo, userRoleRepo, cityRepo, zoneRepo) {
        this.userRepository = userRepository;
        this.userDetailsRepository = userDetailsRepository;
        this.roleRepo = roleRepo;
        this.userRoleRepo = userRoleRepo;
        this.cityRepo = cityRepo;
        this.zoneRepo = zoneRepo;
    }
    async storeUser(dto) {
        try {
            const exists = await this.userRepository.findOne({
                where: { email: dto.email },
            });
            if (exists)
                throw new common_1.BadRequestException('User with this email already exists');
            if (dto.password)
                dto.password = await bcrypt.hash(dto.password, 10);
            const city = await this.cityRepo.findOne({ where: { id: dto.city_id } });
            if (!city)
                throw new common_1.NotFoundException('City not found');
            const zone = await this.zoneRepo.findOne({ where: { id: dto.zone_id } });
            if (!zone)
                throw new common_1.NotFoundException('Zone not found');
            const saved = await this.userRepository.save(this.userRepository.create({
                name: dto.name,
                email: dto.email,
                password: dto.password,
                phone: dto.phone,
                address: dto.address,
                city_id: dto.city_id,
                city: city,
                zone_id: dto.zone_id,
                zone: zone,
                image: dto.image,
            }));
            const role = await this.roleRepo.findOne({ where: { id: dto.role_id } });
            if (!role)
                throw new common_1.NotFoundException('Role not found');
            const userRole = await this.userRoleRepo.create({
                user_id: saved.id,
                user: saved,
                role_id: role.id,
                role: role,
            });
            await this.userRoleRepo.save(userRole);
            const { password, access_token, ...clean } = saved;
            return {
                success: true,
                message: 'User has been created',
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async idnex() {
        try {
            const users = await this.userRepository.find({ relations: ['details'] });
            const data = users.map(({ password, access_token, ...rest }) => rest);
            return { success: true, message: 'User list', data };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                relations: ['details'],
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const { password, access_token, ...clean } = user;
            return { success: true, message: 'User fetched', data: clean };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOnByEmail(email) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
                relations: ['details'],
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const { password, access_token, ...clean } = user;
            return { success: true, message: 'User fetched', data: clean };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async updateUser(id, dto) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            if (dto.email) {
                const dup = await this.userRepository.findOne({
                    where: { email: dto.email, id: (0, typeorm_2.Not)(id) },
                });
                if (dup)
                    throw new common_1.BadRequestException('Email already exists');
            }
            if (dto.password)
                dto.password = await bcrypt.hash(dto.password, 10);
            if (!dto.image)
                dto.image = user.image;
            Object.assign(user, dto);
            const saved = await this.userRepository.save(user);
            const { password, access_token, ...clean } = saved;
            return { success: true, message: 'User updated', data: clean };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async statusUpdate(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            user.status = user.status === 0 ? 1 : 0;
            const saved = await this.userRepository.save(user);
            const { password, access_token, ...clean } = saved;
            const msg = saved.status === 1
                ? 'User has been activated successfully'
                : 'User has been deactivated successfully';
            return { success: true, message: msg, data: clean };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async create_user_details(dto, user) {
        try {
            const exists = await this.userDetailsRepository.findOne({
                where: { user: { id: user.id } },
            });
            if (exists)
                throw new common_1.BadRequestException('User details already exist');
            const details = this.userDetailsRepository.create({
                identity_no: dto.identity_no,
                identity_validity_date: dto.identity_validity_date,
                identity_card_front_url: dto.identity_card_front_url,
                identity_card_back_url: dto.identity_card_back_url,
                user,
            });
            const saved = await this.userDetailsRepository.save(details);
            return {
                success: true,
                message: 'User details added',
                data: saved,
            };
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
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_details_entity_1.UserDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(3, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(4, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __param(5, (0, typeorm_1.InjectRepository)(zone_entity_1.Zone)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map