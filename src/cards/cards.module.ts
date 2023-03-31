import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Card } from './card.model';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    SequelizeModule.forFeature([Card,User])
  ]

})
export class CardsModule {}
