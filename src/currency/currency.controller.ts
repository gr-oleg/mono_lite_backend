import { Body, Controller, Get, Post } from '@nestjs/common';
import { currencyDto } from './dto/currency.dto';
import { CurrencyService } from './currency.service';

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
}
