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
exports.UserAuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../../users/entity/user.entity");
const roles_entity_1 = require("../../roles/entity/roles.entity");
const user_role_entity_1 = require("../../assig-roles-user/entity/user-role.entity");
const sanitize_util_1 = require("../../common/utils/sanitize.util");
const city_entity_1 = require("../../city/entity/city.entity");
const zone_entity_1 = require("../../zone/entity/zone.entity");
const user_details_entity_1 = require("../../users/entity/user_details.entity");
const config_1 = require("@nestjs/config");
const class_transformer_1 = require("class-transformer");
let UserAuthService = class UserAuthService {
    userRepository;
    jwtService;
    roleRepo;
    userRoleRepo;
    cityRepo;
    zoneRepo;
    userDetailsRepo;
    dataSource;
    configService;
    constructor(userRepository, jwtService, roleRepo, userRoleRepo, cityRepo, zoneRepo, userDetailsRepo, dataSource, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.roleRepo = roleRepo;
        this.userRoleRepo = userRoleRepo;
        this.cityRepo = cityRepo;
        this.zoneRepo = zoneRepo;
        this.userDetailsRepo = userDetailsRepo;
        this.dataSource = dataSource;
        this.configService = configService;
    }
    async onModuleInit() {
        await bcrypt.compare('warmup', await bcrypt.hash('warmup', 10));
        this.jwtService.sign({ sub: 1, email: 'warmup@example.com' });
        (0, class_transformer_1.plainToInstance)(user_entity_1.User, this.userRepository.create({ name: 'warmup' }));
        common_1.Logger.log('UserAuthService initialized and warmed up');
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException ||
            err instanceof common_1.NotFoundException) {
            throw err;
        }
        throw new common_1.InternalServerErrorException('Unexpected error occurred', {
            cause: err,
        });
    }
    async register(body) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const oldUsers = await queryRunner.manager.find(user_entity_1.User, {
                where: { email: body.email },
            });
            if (oldUsers.length > 0) {
                throw new common_1.BadRequestException('User with this email already exists');
            }
            if (body.password) {
                body.password = await bcrypt.hash(body.password, 10);
            }
            if (body.city_id) {
                const city = await queryRunner.manager.findOne(city_entity_1.City, { where: { id: body.city_id } });
                if (!city)
                    throw new common_1.NotFoundException('City not found');
            }
            if (body.zone_id) {
                const zone = await queryRunner.manager.findOne(zone_entity_1.Zone, { where: { id: body.zone_id } });
                if (!zone)
                    throw new common_1.NotFoundException('Zone not found');
            }
            const user = queryRunner.manager.getRepository(user_entity_1.User).create({
                name: body.name,
                email: body.email,
                password: body.password,
                phone: body.phone,
                gender: body.gender,
                zone_id: body.zone_id,
                city_id: body.city_id,
                image: body.image,
            });
            const savedUser = await queryRunner.manager.save(user_entity_1.User, user);
            let role = null;
            if (body.role === 'customer' || body.role === 'provider') {
                role = await queryRunner.manager.findOne(roles_entity_1.Role, {
                    where: { name: body.role },
                    select: { id: true, name: true },
                });
                if (!role)
                    throw new common_1.BadRequestException('Role Not Found');
                const userRole = queryRunner.manager.getRepository(user_role_entity_1.UserRole).create({
                    user_id: savedUser.id,
                    user: savedUser,
                    role_id: role.id,
                    role: role,
                });
                const savedUserRole = await queryRunner.manager.save(user_role_entity_1.UserRole, userRole);
                if (!savedUserRole) {
                    throw new common_1.InternalServerErrorException('Failed to assign role to user');
                }
            }
            if (body.role === 'provider') {
                if (!body.identity_card_front_url && !body.identity_card_back_url) {
                    throw new common_1.BadRequestException('Identity card images are required for providers');
                }
                const userDetails = queryRunner.manager.getRepository(user_details_entity_1.UserDetails).create({
                    identity_card_front_url: body.identity_card_front_url,
                    identity_card_back_url: body.identity_card_back_url,
                    user: savedUser,
                    user_id: savedUser.id,
                });
                await queryRunner.manager.save(user_details_entity_1.UserDetails, userDetails);
                await queryRunner.commitTransaction();
                return {
                    success: true,
                    message: 'User is registered and logged in successfully',
                    data: {
                        user: {
                            id: savedUser.id,
                            name: savedUser.name,
                            email: savedUser.email,
                            phone: savedUser.phone,
                        }
                    },
                };
            }
            await queryRunner.commitTransaction();
            const roles = await this.userRoleRepo.find({
                where: { user_id: savedUser.id },
                relations: ['role'],
                select: { role: { id: true, name: true } },
            });
            const roleNames = roles.map(r => r.role.name);
            const payload = {
                sub: savedUser.id,
                email: savedUser.email,
                roles: roleNames,
            };
            const [token, refresh_token] = await Promise.all([
                this.jwtService.signAsync(payload, { expiresIn: '30m' }),
                this.jwtService.signAsync(payload, { expiresIn: '7d' }),
            ]);
            savedUser.access_token = token;
            savedUser.refresh_token = refresh_token;
            await this.userRepository.save(savedUser);
            const userRole = roles[0]?.role;
            return {
                success: true,
                message: 'User is registered and logged in successfully',
                data: {
                    access_token: token,
                    refresh_token: refresh_token,
                    role: userRole ? userRole.name : null,
                },
            };
        }
        catch (err) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            console.error('Registration error:', err);
            this.handleUnknown(err);
        }
        finally {
            await queryRunner.release();
        }
    }
    async validateUser(email, password) {
        try {
            if (!email || !password) {
                throw new common_1.BadRequestException('Email and password are required');
            }
            const user = await this.userRepository.findOne({
                where: { email: email.toLowerCase().trim() },
            });
            if (!user) {
                throw new common_1.BadRequestException('Invalid credentials');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new common_1.BadRequestException('Invalid password');
            }
            return user;
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async login(user) {
        try {
            const [roles, token, refresh_token] = await Promise.all([
                this.userRoleRepo.find({
                    where: { user_id: user.id },
                    relations: ['role'],
                    select: { role: { id: true, name: true } },
                }),
                this.jwtService.signAsync({ sub: user.id, email: user.email }, { expiresIn: '30m' }),
                this.jwtService.signAsync({ sub: user.id, email: user.email }, { expiresIn: '7d' }),
            ]);
            user.access_token = token;
            user.refresh_token = refresh_token;
            await this.userRepository.save(user);
            const userRole = roles[0]?.role;
            return {
                success: true,
                message: 'User has been successfully logged in',
                data: {
                    access_token: token,
                    refresh_token: refresh_token,
                    role: userRole ? { id: userRole.id, name: userRole.name } : null,
                },
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async currentLocation(userId, body) {
        try {
            if (!body.langitude || !body.latitude) {
                throw new common_1.BadRequestException('Longitude and latitude are required');
            }
            const result = await this.userRepository
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({
                location: () => `ST_SetSRID(ST_MakePoint(${body.langitude}, ${body.latitude}), 4326)::geography`,
            })
                .where("id = :id", { id: userId })
                .returning(`
        id,
        name,
        email,
        phone,
        address,
        ST_AsText(location) as location,
        ST_X(location::geometry) as longitude,
        ST_Y(location::geometry) as latitude
      `)
                .execute();
            if (!result.affected) {
                throw new common_1.NotFoundException("User not found");
            }
            const updatedUser = result.raw[0];
            return {
                success: true,
                message: 'User location updated successfully',
                data: {
                    User: {
                        id: updatedUser.id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        phone: updatedUser.phone,
                        address: updatedUser.address,
                        longitude: updatedUser.longitude,
                        latitude: updatedUser.latitude,
                    },
                },
            };
        }
        catch (err) {
            console.error('Error updating user location:', err);
            this.handleUnknown(err);
        }
    }
    async refreshToken(refreshToken) {
        const user = await this.userRepository.findOne({ where: { refresh_token: refreshToken } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid referesh token');
        }
        try {
            const role = await this.userRoleRepo.find({ where: { user_id: user.id }, relations: ['role'] });
            const roleNames = role.map((r) => r.role.name);
            const paylod = this.jwtService.verify(refreshToken, {
                secret: 'user-secret-key',
            });
            const newAccessToken = this.jwtService.sign({
                sub: user.id,
                email: user.email,
                roles: roleNames,
            }, { expiresIn: '30m' });
            user.access_token = newAccessToken;
            await this.userRepository.save(user);
            return {
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    access_token: newAccessToken,
                    user: (0, sanitize_util_1.sanitizeUser)(user),
                },
            };
        }
        catch (err) {
            console.error('Error refreshing token:', err);
            this.handleUnknown(err);
        }
    }
    async profile(user) {
        try {
            const loginUser = await this.userRepository.findOne({
                where: { id: user.id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    address: true,
                    gender: true,
                    street: true,
                    district: true,
                    image: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                },
            });
            if (!loginUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                success: true,
                message: 'User profile fetched successfully',
                data: loginUser,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async profileUpdate(user, body) {
        try {
            const exist = await this.userRepository.findOne({
                where: { id: user.id },
            });
            if (!exist) {
                throw new common_1.NotFoundException('User Not Found');
            }
            if (body.name !== undefined)
                exist.name = body.name;
            if (body.street !== undefined)
                exist.street = body.street;
            if (body.district !== undefined)
                exist.district = body.district;
            if (body.address !== undefined)
                exist.address = body.address;
            if (body.gender !== undefined)
                exist.gender = body.gender;
            if (body.phone !== undefined)
                exist.phone = body.phone;
            if (body.image !== undefined)
                exist.image = body.image;
            const savedUser = await this.userRepository.save(exist);
            return {
                success: true,
                message: 'Password updated successfully',
                data: savedUser,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async changePassword(body, user) {
        try {
            const { oldPassword, newPassword } = body;
            if (!oldPassword || !newPassword) {
                throw new common_1.BadRequestException('Both old and new passwords are required');
            }
            const loginUser = await this.userRepository.findOne({
                where: { id: user.id },
            });
            if (!loginUser) {
                throw new common_1.NotFoundException('User not found');
            }
            const matched = await bcrypt.compare(oldPassword, loginUser.password);
            if (!matched) {
                throw new common_1.BadRequestException('Old password is incorrect');
            }
            if (newPassword.trim().length < 6) {
                throw new common_1.BadRequestException('New password must be at least 6 characters long');
            }
            loginUser.password = await bcrypt.hash(newPassword.trim(), 10);
            await this.userRepository.save(loginUser);
            return {
                success: true,
                message: 'Password updated successfully',
                data: {},
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async modeChnage(user) {
        try {
            const currentUser = await this.userRepository.findOne({
                where: { id: user.id },
            });
            if (!currentUser)
                throw new common_1.NotFoundException('Driver not Found');
            currentUser.isOnline = currentUser.isOnline === 1 ? 0 : 1;
            const saved = await this.userRepository.save(currentUser);
            const is = currentUser.isOnline === 1 ? 'Online' : 'Ofline';
            return {
                success: true,
                message: `Driver is ${is} now`,
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async logout(data) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: data.id },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.access_token = '';
            await this.userRepository.save(user);
            return {
                success: true,
                message: 'User has been logged out successfully',
                data: {},
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
};
exports.UserAuthService = UserAuthService;
exports.UserAuthService = UserAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(3, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(4, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __param(5, (0, typeorm_1.InjectRepository)(zone_entity_1.Zone)),
    __param(6, (0, typeorm_1.InjectRepository)(user_details_entity_1.UserDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        config_1.ConfigService])
], UserAuthService);
//# sourceMappingURL=user-auth.service.js.map