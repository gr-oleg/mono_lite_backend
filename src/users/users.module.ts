import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from 'src/cards/card.model';
import { CardsService } from 'src/cards/cards.service';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,CardsService],
  imports: [
    SequelizeModule.forFeature([User,Card])
  ]
})
export class UsersModule {}
