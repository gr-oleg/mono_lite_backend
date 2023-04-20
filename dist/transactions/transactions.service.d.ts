import { Card } from 'src/cards/card.model';
import { HttpException } from '@nestjs/common';
import { Transaction } from './transactions.model';
import { createTransactionDto } from './dto/create-transaction.dto';
import { AuthService } from 'src/auth/auth.service';
import { CardsService } from 'src/cards/cards.service';
import { CashBack } from 'src/cashback/cashback.model';
export declare class TransactionsService {
    private cardRepository;
    private transactionModel;
    private cashBackModel;
    private authService;
    private cardService;
    constructor(cardRepository: typeof Card, transactionModel: typeof Transaction, cashBackModel: typeof CashBack, authService: AuthService, cardService: CardsService);
    createTransaction(dto: createTransactionDto): Promise<Transaction>;
    getCurrentCard(): Promise<Card>;
    getReceiverCard(dto: createTransactionDto): Promise<Card>;
    getUsersTransactions(): Promise<Transaction[]>;
    simulateDeposit(dto: createTransactionDto): Promise<Transaction>;
    simulateWithdrawal(dto: createTransactionDto): Promise<HttpException | Transaction>;
    getAllTransactions(): Promise<Transaction[]>;
    updateCashBackBalance(amount: number): Promise<void>;
}
