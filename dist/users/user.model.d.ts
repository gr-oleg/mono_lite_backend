import { Model } from "sequelize-typescript";
import { Card } from "src/cards/card.model";
interface UserCreationsAttrs {
    first_name: string;
    second_name: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationsAttrs> {
    user_id: number;
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    cards: Card[];
    static user_id: number;
}
export {};
