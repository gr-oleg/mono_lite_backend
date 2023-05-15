import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from './currency.model';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [SequelizeModule.forFeature([Currency])],
  exports: [CurrencyService],
})
export class CurrencyModule {}
