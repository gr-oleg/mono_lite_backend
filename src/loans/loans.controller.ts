import { Controller, Get ,Post,Param,Body} from '@nestjs/common';
import { LoansService } from './loans.service';
import { createLoanDto } from './dto/createLoan.dto';

@Controller('loans')
export class LoansController {
    constructor(private loansServices: LoansService) { }
    
    @Get('/:id')
    showLoan(@Param('id') id: number) {
        return this.loansServices.showLoanEntity(id);
    }

    @Post('/new')
    createLoan(@Body() dto: createLoanDto) {
        return this.loansServices.createLoan(dto)
    }

    @Post('/pay/part')
    payPartOfLoan(@Body() dto: createLoanDto) {
        return this.loansServices.payPartOfLoan(dto);
    }
    @Post('/pay/full')
    payFullLoan(@Body() dto: createLoanDto) {
        return this.loansServices.payFullLoan(dto);
    }
    
}
