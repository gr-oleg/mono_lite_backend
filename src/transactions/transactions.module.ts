import { Module , forwardRef} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';
import { Card } from 'src/cards/card.model';
import { CardsModule } from 'src/cards/cards.module';
import { AuthModule } from 'src/auth/auth.module';
import { CashbackModule } from 'src/cashback/cashback.module';
import { CashbackService } from 'src/cashback/cashback.service';
import { CashBack } from 'src/cashback/cashback.model';
// import { CashBack } from 'src/cashback/cashback.model';

@Module({
  controllers:[TransactionsController],
  providers: [TransactionsService],
  imports: [
        forwardRef(() => CardsModule),
        forwardRef(() => AuthModule),
        forwardRef(() => CashbackModule),
    SequelizeModule.forFeature([Transaction,Card,CashBack])
  ],
  exports: [
      TransactionsService
    ]
})
export class TransactionsModule {}
