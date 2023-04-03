import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Card } from './card.model';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
// import { Transaction } from 'src/transactions/transactions.model';


@Module({
  
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    SequelizeModule.forFeature([Card,User])
  ]

})
export class CardsModule {}
