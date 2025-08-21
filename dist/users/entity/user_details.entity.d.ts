import { User } from '../entity/user.entity';
export declare class UserDetails {
    id: number;
    identity_no: string;
    identity_validity_date: Date;
    identity_card_front_url: string;
    identity_card_back_url: string;
    user_id: number;
    user: User;
}
