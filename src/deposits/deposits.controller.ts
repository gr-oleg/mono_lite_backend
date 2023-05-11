import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { createDepositDto } from './dto/createDeposit.dto';

@Controller('deposits')
export class DepositsController {
  constructor(private depositsService: DepositsService) {}

  @Post()
  async createDeposit(@Body() dto: createDepositDto) {
    return await this.depositsService.createDeposit(dto);
  }

  @Post('update')
  async updateAmountOfDeposit(@Body() dto: createDepositDto) {
    return await this.depositsService.updateAmountOfDeposit(dto);
  }

  @Get('/:id')
  async showUserVaults(@Param('id') id: number) {
    return await this.depositsService.showUserVaults(id);
  }
  @Get()
  async showAll() {
    return await this.depositsService.showAllVaults();
  }
  @Post('/destroy')
  async destroyVault(@Body() dto: createDepositDto) {
    return await this.depositsService.destroyVault(dto);
  }
}
