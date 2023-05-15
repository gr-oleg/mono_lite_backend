import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from './currency.model';
import { currencyDto } from './dto/currency.dto';

@Injectable()
export class CurrencyService {
  constructor(@InjectModel(Currency) private currencyModel: typeof Currency) {}

  async updateCurrency(dto: currencyDto) {
    const currency = await this.currencyModel.findByPk(dto.currency_id);
    const updatedCurrency = await currency.update({
      date: dto.date,
      rateBuy: dto.rateBuy,
      rateSell: dto.rateSell,
    });
      
    return updatedCurrency;
  }
    
    async sendCurrencyInfo() {
        const currencies = await this.currencyModel.findAll();
        return currencies;
    }
}
