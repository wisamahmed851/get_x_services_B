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
exports.PaymentMethodsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_method_entity_1 = require("./entity/payment-method.entity");
let PaymentMethodsService = class PaymentMethodsService {
    paymentRepo;
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }
    async create(dto, id) {
        try {
            const exists = await this.paymentRepo.findOne({
                where: [{ method_name: dto.method_name }, { code: dto.code }],
            });
            if (exists) {
                throw new common_1.BadRequestException('Payment method or code already exists');
            }
            const newMethod = this.paymentRepo.create({
                ...dto,
                created_by: id,
            });
            const saved = await this.paymentRepo.save(newMethod);
            return {
                success: true,
                message: 'Payment method created successfully',
                data: saved,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findAll() {
        try {
            const list = await this.paymentRepo.find();
            return {
                success: true,
                message: 'All payment methods retrieved successfully',
                data: list,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async toogleStatus(id) {
        try {
            const method = await this.paymentRepo.findOne({ where: { id } });
            if (!method)
                throw new common_1.NotFoundException('Payment method not found');
            method.status = method.status === 0 ? 1 : 0;
            await this.paymentRepo.save(method);
            const message = method.status === 0
                ? 'Payment Method is inactive'
                : 'Payment Method is activated';
            return {
                success: true,
                message: message,
                data: method,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async findOne(id) {
        try {
            const method = await this.paymentRepo.findOne({ where: { id } });
            if (!method)
                throw new common_1.NotFoundException('Payment method not found');
            return {
                success: true,
                message: 'Payment method retrieved successfully',
                data: method,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async update(id, dto) {
        try {
            const method = await this.paymentRepo.findOne({ where: { id } });
            if (!method)
                throw new common_1.NotFoundException('Payment method not found');
            if (!dto.image) {
                dto.image = method.image;
            }
            Object.assign(method, dto);
            method.updated_at = new Date().toISOString().split('T')[0];
            const updated = await this.paymentRepo.save(method);
            return {
                success: true,
                message: 'Payment method updated successfully',
                data: updated,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    async remove(id) {
        try {
            const method = await this.paymentRepo.findOne({ where: { id } });
            if (!method)
                throw new common_1.NotFoundException('Payment method not found');
            await this.paymentRepo.remove(method);
            return {
                success: true,
                message: 'Payment method deleted successfully',
                data: null,
            };
        }
        catch (err) {
            this.handleUnknown(err);
        }
    }
    handleUnknown(err) {
        if (err instanceof common_1.BadRequestException || err instanceof common_1.NotFoundException)
            throw err;
        console.log(err);
        throw new common_1.InternalServerErrorException('Unexpected error', {
            cause: err,
        });
    }
};
exports.PaymentMethodsService = PaymentMethodsService;
exports.PaymentMethodsService = PaymentMethodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_method_entity_1.PaymentMethod)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentMethodsService);
//# sourceMappingURL=payment-methods.service.js.map