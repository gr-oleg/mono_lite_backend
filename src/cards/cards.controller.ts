import { Body, Controller, Post ,Get,Param} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';


@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService ) { }

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
    
    @Get()
    getAll() {
        return this.cardsService.getAllCards()
    }
    
}
