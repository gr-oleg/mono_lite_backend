import { Card } from 'src/cards/card.model';
import { Transaction } from './transactions.model';
import { createTransactionDto } from './dto/create-transaction.dto';
import { AuthService } from 'src/auth/auth.service';
import { CardsService } from 'src/cards/cards.service';
export declare class TransactionsService {
    private cardRepository;
    private transactionModel;
    private authService;
    private cardService;
    constructor(cardRepository: Card, transactionModel: typeof Transaction, authService: AuthService, cardService: CardsService);
    createTransaction(dto: createTransactionDto): Promise<Transaction>;
    getSenderCard(): Promise<Card>;
    getReceiverCard(dto: createTransactionDto): Promise<Card>;
    getAllTransactions(): Promise<Transaction[]>;
    simulateDeposit(dto: createTransactionDto): Promise<Transaction>;
    simulateWithdrawal(dto: createTransactionDto): Promise<Transaction>;
}
