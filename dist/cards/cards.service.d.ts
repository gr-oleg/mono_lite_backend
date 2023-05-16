import { Card } from './card.model';
import { User } from '../users/user.model';
export declare class CardsService {
    private cardModel;
    private userModel;
    constructor(cardModel: typeof Card, userModel: typeof User);
    getCardById(id: number): Promise<Card>;
    createCard(user_id: number): Promise<Card>;
    getAllCards(): Promise<Card[]>;
    getCardsByUserId(user_id: number): Promise<Card>;
    getCardByNumber(card_number: string): Promise<Card>;
    generateUniqueCardNumber(): Promise<string>;
    generateRandomCardNumber(): Promise<string>;
    generateCVV(): Promise<string>;
}
