import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { currencyDto } from './dto/currency.dto';
import { CurrencyService } from './currency.service';
import { updateCurrencyBalanceDto } from './dto/updateBalance.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post('')
  async createCurrency(@Body() dto: currencyDto) {
    return await this.currencyService.updateCurrency(dto);
  }

  @Get('/info')
  async sendInfo() {
    return await this.currencyService.sendCurrencyInfo();
  }

  @Get('/:id')
  async getUserCurrencyEntity(@Param('id') id: number) {
    return await this.currencyService.getUserCurrencyEntity(id);
  }

  @Post('/sell')
  async sellCurrency(@Body() dto: updateCurrencyBalanceDto) {
    return await this.currencyService.sellCurrency(dto);
  }
  @Post('/buy')
  async buyCurrency(@Body() dto: updateCurrencyBalanceDto) {
    return await this.currencyService.buyCurrency(dto);
  }
}
