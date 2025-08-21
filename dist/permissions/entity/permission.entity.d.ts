export declare class Permission {
    id: number;
    module: string;
    action: string;
    name: string;
    guard: string;
    status: number;
    created_at: String;
    updated_at: String;
    setCreateDateParts(): void;
}
