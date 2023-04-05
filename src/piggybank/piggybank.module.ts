import { Module } from '@nestjs/common';
import { PiggybankService } from './piggybank.service';
import { PiggybankController } from './piggybank.controller';

@Module({
  providers: [PiggybankService],
  controllers: [PiggybankController]
})
export class PiggybankModule {}
