import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PiggybankService } from './piggybank.service';
import { createPigVaultDto } from './dto/create-Pig-Vault.dto';

@Controller('piggybank')
export class PiggybankController {
    constructor(private pigService: PiggybankService) { }

    @Get('/:id')
    showVaults(@Param('id') id: number) {
        return this.pigService.showUserVaults(id);
    }
    @Get('/all')
    getAll() {
        return this.pigService.getAllVaults();
    }
    @Post('/new')
    createVault(@Body() dto: createPigVaultDto) {
        return this.pigService.createVault(dto);
    }
    @Post('/add')
    addContributor(@Body() dto: createPigVaultDto) {
        return this.pigService.addContributor(dto);
    }
    @Post('/remove')
    removeContributor(@Body() dto: createPigVaultDto) {
        return this.pigService.removeContributor(dto);
    }
    @Post('/break')
    breakVault(@Body() dto: createPigVaultDto) {
        return this.pigService.breakVault(dto);
    }
    @Post('/deposit')
    depositToVault(@Body() dto: createPigVaultDto) {
        return this.pigService.depositToVault(dto);
    }
    @Post('/withdraw')
    withdrawFromVault(@Body() dto: createPigVaultDto) {
        return this.pigService.withdrawFromVault(dto);
    }
}
