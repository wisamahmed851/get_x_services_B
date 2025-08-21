export declare class PaymentMethod {
    id: number;
    method_name: string;
    code: string;
    route: string;
    image_name: string;
    image: string;
    type: string;
    description: string;
    status: number;
    created_by: number;
    created_at: string;
    updated_at: string;
    setCreateDateParts(): void;
}
