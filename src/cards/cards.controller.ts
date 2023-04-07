import { Body, Controller, Post ,Get,Param} from '@nestjs/common';
import {CreateCardDto} from './dto/create-card.dto'
import { CardsService } from './cards.service';
import { TransactionsService } from 'src/transactions/transactions.service';
// import { AuthService } from 'src/auth/auth.service';


@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService,
  private transactionService:TransactionsService) { }

  @Post()
  async create(@Body() dto: CreateCardDto) {
      const user_id = Number(dto)
    return this.cardsService.createCard(user_id);
  }

  @Get(':card_id')
  async getCardById(@Param('card_id') card_id: number) {
    const card = await this.cardsService.getCardById(card_id);
    return card ;
  }
    
    @Get('/all')
    getAll() {
        return this.cardsService.getAllCards()
  }

    @Get()
    getUserCard() { 
      return this.transactionService.getCurrentCard();
  }
  
  // @Post('/test')
  // async getCardByNumber(@Body() dto:CreateCardDto) {
  //   return this.cardsService.getCardByNumber(dto.card_number);
  // }
    
}
