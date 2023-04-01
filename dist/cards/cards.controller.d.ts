import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';
export declare class CardsController {
    private cardsService;
    constructor(cardsService: CardsService);
    create(dto: CreateCardDto): Promise<import("./card.model").Card>;
    getCardById(card_id: number): Promise<import("./card.model").Card>;
    getAll(): Promise<import("./card.model").Card[]>;
}
