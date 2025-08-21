import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from './dtos/payment-method.dto';
import { User } from 'src/users/entity/user.entity';
export declare class PaymentMethodsController {
    private readonly service;
    constructor(service: PaymentMethodsService);
    create(file: Express.Multer.File, dto: CreatePaymentMethodDto, user: User): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/payment-method.entity").PaymentMethod;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/payment-method.entity").PaymentMethod[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/payment-method.entity").PaymentMethod;
    }>;
    toogleStatus(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/payment-method.entity").PaymentMethod;
    }>;
    update(id: number, file: Express.Multer.File, dto: UpdatePaymentMethodDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/payment-method.entity").PaymentMethod;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
