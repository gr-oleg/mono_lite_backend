import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';
import { TransactionsService } from 'src/transactions/transactions.service';
export declare class CardsController {
    private cardsService;
    private transactionService;
    constructor(cardsService: CardsService, transactionService: TransactionsService);
    create(dto: CreateCardDto): Promise<import("./card.model").Card>;
    getCardById(card_id: number): Promise<import("./card.model").Card>;
    getAll(): Promise<import("./card.model").Card[]>;
    getUserCard(): Promise<import("./card.model").Card>;
}
