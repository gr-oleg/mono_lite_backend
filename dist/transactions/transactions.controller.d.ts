import { createTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.model';
export declare class TransactionsController {
    private transactionService;
    constructor(transactionService: TransactionsService);
    createTransaction(dto: createTransactionDto): Promise<Transaction>;
    simulateDeposit(dto: createTransactionDto): Promise<Transaction>;
    simulateWithdrawal(dto: createTransactionDto): Promise<Transaction>;
    getUserTransactions(userId: number): Promise<Transaction[]>;
    getAllTransactions(): Promise<Transaction[]>;
}
