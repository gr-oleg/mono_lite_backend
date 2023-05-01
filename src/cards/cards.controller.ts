import { Body, Controller, Post ,Get,Param} from '@nestjs/common';
import {CreateCardDto} from './dto/create-card.dto'
import { CardsService } from './cards.service';


@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) { }

  @Post()
    
    @Get('/all')
    getAll() {
        return this.cardsService.getAllCards()
  }

    @Get('/:id')
    getUserCard(@Param('id') id:number) { 
      return this.cardsService.getCardById(id);
  }
  

    
}
