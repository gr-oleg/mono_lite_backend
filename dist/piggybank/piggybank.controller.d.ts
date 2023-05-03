import { PiggybankService } from './piggybank.service';
import { createPigVaultDto } from './dto/create-Pig-Vault.dto';
export declare class PiggybankController {
    private pigService;
    constructor(pigService: PiggybankService);
    showVaults(id: number): Promise<import("./piggybank.model").PiggyBank[]>;
    getAll(): Promise<import("./piggybank.model").PiggyBank[]>;
    createVault(dto: createPigVaultDto): Promise<import("./piggybank.model").PiggyBank>;
    addContributor(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    removeContributor(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    breakVault(dto: createPigVaultDto): Promise<import("../transactions/transactions.model").Transaction>;
    depositToVault(dto: createPigVaultDto): Promise<import("../transactions/transactions.model").Transaction>;
    withdrawFromVault(dto: createPigVaultDto): Promise<import("../transactions/transactions.model").Transaction>;
}
