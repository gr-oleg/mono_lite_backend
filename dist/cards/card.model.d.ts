import { Model } from 'sequelize-typescript';
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
    static generateCardNumber(card: Card): Promise<void>;
}
export declare function generateUniqueCardNumber(): Promise<string>;
export declare function generateCVV(): Promise<string>;
