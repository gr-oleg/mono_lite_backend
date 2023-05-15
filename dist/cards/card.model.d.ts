import { Model } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
export declare class Card extends Model<Card> {
    card_id: number;
    user_id: number;
    card_number: string;
    card_balance: number;
    card_CVV: string;
    owner_name: string;
    owner_surname: string;
    blocked: boolean;
    blockReason: string;
    card_dollar_balance: number;
    card_euro_balance: number;
    static generateCardNumber(card: Card): Promise<void>;
    user: User;
    static updateCardNumber(card: Card): Promise<void>;
}
export declare function generateUniqueCardNumber(): Promise<string>;
export declare function generateCVV(): Promise<string>;
