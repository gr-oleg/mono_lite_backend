import { Controller, Post,Get, Body } from '@nestjs/common';
import { createTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    
constructor(private transactionService: TransactionsService){}

    @Post('/new')
    createTransaction(@Body() dto: createTransactionDto) {
        return this.transactionService.createTransaction(dto)
    }

    @Post('/simulate/deposit')
    simulateDeposit(@Body() dto: createTransactionDto) {
        return this.transactionService.simulateDeposit(dto)
    }

    @Post('/simulate/withdrawal')
    simulateWithdrawal(@Body() dto: createTransactionDto) {
        return this.transactionService.simulateWithdrawal(dto)
    }

    @Get()
    getUserTransactions() {
        return this.transactionService.getUsersTransactions();
    }
    
    @Get('/all')
    getAllTransactions() {
        return this.transactionService.getAllTransactions();
    }
}
