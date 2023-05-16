import { Model } from "sequelize-typescript";
import { Card } from "src/cards/card.model";
import { UserCurrency } from "src/currency/userCurrency.model";
interface UserCreationsAttrs {
    first_name: string;
    second_name: string;
    email: string;
    password: string;
    imageURL: string;
}
export declare class User extends Model<User, UserCreationsAttrs> {
    user_id: number;
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    card_number: string;
    imageURL: string;
    cards: Card[];
    static user_id: number;
    userCurrency: UserCurrency;
}
export {};
