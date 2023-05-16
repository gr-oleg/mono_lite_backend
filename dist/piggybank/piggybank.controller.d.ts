import { PiggybankService } from './piggybank.service';
import { createPigVaultDto } from './dto/create-Pig-Vault.dto';
import { PiggyBank } from './piggybank.model';
export declare class PiggybankController {
    private pigService;
    constructor(pigService: PiggybankService);
    showVaults(id: number): Promise<PiggyBank[]>;
    getAll(): Promise<PiggyBank[]>;
    createVault(dto: createPigVaultDto): Promise<PiggyBank>;
    addContributor(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    removeContributor(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    breakVault(dto: createPigVaultDto): Promise<import("../transactions/transactions.model").Transaction>;
    depositToVault(dto: createPigVaultDto): Promise<import("../transactions/transactions.model").Transaction>;
    withdrawFromVault(dto: createPigVaultDto): Promise<import("../transactions/transactions.model").Transaction>;
    changeTitle(dto: createPigVaultDto): Promise<[affectedCount: number]>;
    changeTargetSum(dto: createPigVaultDto): Promise<[affectedCount: number]>;
}
