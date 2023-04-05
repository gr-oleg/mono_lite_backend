import { Module } from '@nestjs/common';
import { CashbackController } from './cashback.controller';

@Module({
  controllers: [CashbackController]
})
export class CashbackModule {}
