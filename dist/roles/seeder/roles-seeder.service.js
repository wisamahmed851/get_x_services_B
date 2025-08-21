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
exports.RolesSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_entity_1 = require("../entity/roles.entity");
const typeorm_2 = require("typeorm");
let RolesSeederService = class RolesSeederService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async seed() {
        const defaultRoles = [
            { name: 'admin', guard: 'admin' },
            { name: 'manager', guard: 'admin' },
            { name: 'customer', guard: 'customer' },
            { name: 'provider', guard: 'user' },
        ];
        for (const roleData of defaultRoles) {
            const exists = await this.roleRepository.findOne({
                where: { name: roleData.name },
            });
            if (!exists) {
                const role = this.roleRepository.create(roleData);
                await this.roleRepository.save(role);
                common_1.Logger.log(`✅ Seeded role: ${JSON.stringify(roleData)}`, 'RolesSeederService');
            }
            else {
                common_1.Logger.log(`ℹ️ Role already exists: ${JSON.stringify(roleData)}`, 'RolesSeederService');
            }
        }
    }
};
exports.RolesSeederService = RolesSeederService;
exports.RolesSeederService = RolesSeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesSeederService);
//# sourceMappingURL=roles-seeder.service.js.map