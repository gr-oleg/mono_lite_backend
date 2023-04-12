import { createTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private transactionService;
    constructor(transactionService: TransactionsService);
    createTransaction(dto: createTransactionDto): Promise<import("./transactions.model").Transaction>;
    simulateDeposit(dto: createTransactionDto): Promise<import("./transactions.model").Transaction>;
    simulateWithdrawal(dto: createTransactionDto): Promise<import("./transactions.model").Transaction | import("@nestjs/common").HttpException>;
    getUserTransactions(): Promise<import("./transactions.model").Transaction[]>;
    getAllTransactions(): Promise<import("./transactions.model").Transaction[]>;
}
