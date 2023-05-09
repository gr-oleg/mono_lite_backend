import { PiggyBank } from './piggybank.model';
import { createPigVaultDto } from './dto/create-Pig-Vault.dto';
import { Card } from 'src/cards/card.model';
import { CardsService } from 'src/cards/cards.service';
import { Transaction } from 'src/transactions/transactions.model';
export declare class PiggybankService {
    private vaultModel;
    private cardModel;
    private transactionsModel;
    private cardService;
    constructor(vaultModel: typeof PiggyBank, cardModel: typeof Card, transactionsModel: typeof Transaction, cardService: CardsService);
    createVault(dto: createPigVaultDto): Promise<PiggyBank>;
    depositToVault(dto: createPigVaultDto): Promise<Transaction>;
    withdrawFromVault(dto: createPigVaultDto): Promise<Transaction>;
    breakVault(dto: createPigVaultDto): Promise<Transaction>;
    showUserVaults(user_id: number): Promise<PiggyBank[]>;
    changeVaultTitle(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    getAllVaults(): Promise<PiggyBank[]>;
    addContributor(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    removeContributor(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    changeTargenSum(dto: createPigVaultDto): Promise<[affectedCount: number]>;
}
