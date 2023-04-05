import { Module , forwardRef} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Card } from './card.model';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { AuthModule } from 'src/auth/auth.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
// import { Transaction } from 'src/transactions/transactions.model';


@Module({
  
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    forwardRef(()=> AuthModule),
    forwardRef(()=> TransactionsModule),
    SequelizeModule.forFeature([Card,User])
  ],
  exports: [
  CardsService
]

})
export class CardsModule {}
