import { User } from "src/users/entity/user.entity";
export declare class UserWallet {
    id: number;
    user_id: number;
    user: User;
    balance: number;
    status: number;
    created_at: String;
    updated_at: String;
    setCreateDateParts(): void;
}
