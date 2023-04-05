import { Module , forwardRef} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';
import { Card } from 'src/cards/card.model';
import { CardsModule } from 'src/cards/cards.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers:[TransactionsController],
  providers: [TransactionsService],
    imports: [
        forwardRef(() => CardsModule),
        forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Transaction,Card])
  ]
})
export class TransactionsModule {}
