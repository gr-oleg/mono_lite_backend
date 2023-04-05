import { Controller,Post } from '@nestjs/common';
import { CashBackDto } from './dto/cashBack.dto';
import { CashbackService } from './cashback.service';

@Controller('cashback')
export class CashbackController {

    constructor(private cashbackService: CashbackService){}

    @Post()
    getCashBack(dto: CashBackDto) {
        return this.cashbackService.getCashBackToBalance(dto);
    }
}
