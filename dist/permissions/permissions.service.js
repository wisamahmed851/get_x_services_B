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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entity/permission.entity");
let PermissionsService = class PermissionsService {
    permissionRepo;
    constructor(permissionRepo) {
        this.permissionRepo = permissionRepo;
    }
    async create(data) {
        try {
            const existingPermission = await this.permissionRepo.findOne({
                where: { name: data.name, guard: data.guard },
            });
            if (existingPermission) {
                throw new common_1.BadRequestException('This name permission is already made');
            }
            const permission = this.permissionRepo.create(data);
            const saved = await this.permissionRepo.save(permission);
            return {
                success: true,
                message: 'Permission created successfully',
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll() {
        try {
            const permissions = await this.permissionRepo.find();
            return {
                success: true,
                message: 'All permissions fetched successfully',
                data: permissions,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const permission = await this.permissionRepo.findOneBy({ id });
            if (!permission) {
                throw new common_1.NotFoundException('Permission not found');
            }
            return {
                success: true,
                message: 'Permission fetched successfully',
                data: permission,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, data) {
        try {
            const existingPermission = await this.permissionRepo.findOne({
                where: {
                    id: (0, typeorm_2.Not)(id),
                    name: data.name,
                    guard: data.guard,
                },
            });
            if (existingPermission) {
                throw new common_1.BadRequestException('This name permission is already made');
            }
            const permission = await this.permissionRepo.findOne({ where: { id } });
            if (!permission) {
                throw new common_1.NotFoundException('Permission not found');
            }
            Object.assign(permission, data);
            const savedPermission = await this.permissionRepo.save(permission);
            return {
                success: true,
                message: 'Permission updated successfully',
                data: savedPermission,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async toogleStatus(id) {
        try {
            const permission = await this.permissionRepo.findOne({ where: { id } });
            if (!permission) {
                throw new common_1.NotFoundException('Permission not found');
            }
            permission.status = permission.status === 0 ? 1 : 0;
            const updated = await this.permissionRepo.save(permission);
            return {
                success: true,
                message: permission.status === 1
                    ? 'Permission is activated'
                    : 'Permission is deactivated',
                data: updated,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id) {
        try {
            const found = await this.findOne(id);
            const permission = found.data;
            const removed = await this.permissionRepo.remove(permission);
            return {
                success: true,
                message: 'Permission deleted successfully',
                data: removed,
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
        throw new common_1.InternalServerErrorException('Unexpected error occurred', {
            cause: err,
        });
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map