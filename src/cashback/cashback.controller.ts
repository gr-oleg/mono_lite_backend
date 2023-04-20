import { Controller,Post,Get ,Body} from '@nestjs/common';
import { CashBackDto } from './dto/cashBack.dto';
import { CashbackService } from './cashback.service';

@Controller('cashback')
export class CashbackController {

    constructor(private cashbackService: CashbackService){}

    @Post()
    getCashBack(@Body() dto: CashBackDto) {
        return this.cashbackService.getCashBackToBalance(dto);
    }
    @Get('/balance')
    getBalance(){
        return this.cashbackService.showBalance();
     }
}
