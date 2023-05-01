import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card, generateCVV, generateUniqueCardNumber } from './card.model';
import { User } from '../users/user.model';
// import { TransactionsService } from 'src/transactions/transactions.service';
// import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card) private cardModel: typeof Card,
    @InjectModel(User) private userModel: typeof User,
  
    
  ) {}

  async getCardById(id: number) {
    console.log(id);
    const card = await this.cardModel.findByPk(id);
    return card;
  }
  async createCard(user_id: number) {
    const user = await this.userModel.findByPk(user_id);
    if (!user) {
      throw new NotFoundException('This User does not exist');
    }

    const cardNumber = await generateUniqueCardNumber();
    const codeCVV = await generateCVV();
    const card = await this.cardModel.create({
      user_id: user_id,
      owner_name: user.first_name,
      owner_surname: user.second_name,
      card_number: cardNumber,
      card_balance: 0,
      card_CVV:codeCVV ,
      blocked: false,
      blockReason: '',
    });

    return card;
  }

  async getAllCards() {
    const cards = await this.cardModel.findAll();
    return cards;
  }

  async getCardsByUserId(user_id: number) {
    const card = await this.cardModel.findOne({ where: { user_id } });

    return card;
  }

  async getCardByNumber(card_number: string) {
    const card = await this.cardModel.findOne({ where:{ card_number } });
   
    return card;
  }

  
}
