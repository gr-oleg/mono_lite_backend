import { Controller,Post,Get ,Body, Param} from '@nestjs/common';
import { CashBackDto } from './dto/cashBack.dto';
import { CashbackService } from './cashback.service';

@Controller('cashback')
export class CashbackController {

    constructor(private cashbackService: CashbackService){}

    @Post()
    getCashBack(@Body() dto: CashBackDto) {
        return this.cashbackService.getCashBackToBalance(dto);
    }
    @Get('/balance/:id')
    getBalance(@Param('id') id:number){
        return this.cashbackService.showBalance(id);
     }
}
