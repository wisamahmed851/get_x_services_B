import { Repository } from 'typeorm';
import { PaymentMethod } from './entity/payment-method.entity';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from './dtos/payment-method.dto';
export declare class PaymentMethodsService {
    private readonly paymentRepo;
    constructor(paymentRepo: Repository<PaymentMethod>);
    create(dto: CreatePaymentMethodDto, id: number): Promise<{
        success: boolean;
        message: string;
        data: PaymentMethod;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: PaymentMethod[];
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: PaymentMethod;
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: PaymentMethod;
    }>;
    update(id: number, dto: UpdatePaymentMethodDto): Promise<{
        success: boolean;
        message: string;
        data: PaymentMethod;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    private handleUnknown;
}
