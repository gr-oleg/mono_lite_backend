import { CardsService } from './cards.service';
export declare class CardsController {
    private cardsService;
    constructor(cardsService: CardsService);
    getAll(): Promise<import("./card.model").Card[]>;
    getUserCard(id: number): Promise<import("./card.model").Card>;
}
