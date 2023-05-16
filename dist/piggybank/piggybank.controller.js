"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiggybankController = void 0;
const common_1 = require("@nestjs/common");
const piggybank_service_1 = require("./piggybank.service");
const create_Pig_Vault_dto_1 = require("./dto/create-Pig-Vault.dto");
const swagger_1 = require("@nestjs/swagger");
const piggybank_model_1 = require("./piggybank.model");
let PiggybankController = class PiggybankController {
    constructor(pigService) {
        this.pigService = pigService;
    }
    showVaults(id) {
        return this.pigService.showUserVaults(id);
    }
    getAll() {
        return this.pigService.getAllVaults();
    }
    createVault(dto) {
        return this.pigService.createVault(dto);
    }
    addContributor(dto) {
        return this.pigService.addContributor(dto);
    }
    removeContributor(dto) {
        return this.pigService.removeContributor(dto);
    }
    breakVault(dto) {
        return this.pigService.breakVault(dto);
    }
    depositToVault(dto) {
        return this.pigService.depositToVault(dto);
    }
    withdrawFromVault(dto) {
        return this.pigService.withdrawFromVault(dto);
    }
    changeTitle(dto) {
        return this.pigService.changeVaultTitle(dto);
    }
    changeTargetSum(dto) {
        return this.pigService.changeTargenSum(dto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User Vaults' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns user vaults', type: [piggybank_model_1.PiggyBank] }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "showVaults", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Vaults' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all vaults' }),
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Vault' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vault created successfully' }),
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "createVault", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add Contributor' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contributor added successfully' }),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "addContributor", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove Contributor' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contributor removed successfully' }),
    (0, common_1.Post)('/remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "removeContributor", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Break Vault' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vault broken successfully' }),
    (0, common_1.Post)('/break'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "breakVault", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deposit to Vault' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amount deposited successfully' }),
    (0, common_1.Post)('/deposit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "depositToVault", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Withdraw from Vault' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amount withdrawn successfully' }),
    (0, common_1.Post)('/withdraw'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "withdrawFromVault", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Change Vault Title' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vault title changed successfully' }),
    (0, common_1.Post)('/title'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "changeTitle", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Change Vault Target Sum' }),
    (0, swagger_1.ApiBody)({ type: create_Pig_Vault_dto_1.createPigVaultDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vault sum changed successfully' }),
    (0, common_1.Post)('/title'),
    (0, common_1.Post)('/sum'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "changeTargetSum", null);
PiggybankController = __decorate([
    (0, swagger_1.ApiTags)('Piggy Bank'),
    (0, common_1.Controller)('piggybank'),
    __metadata("design:paramtypes", [piggybank_service_1.PiggybankService])
], PiggybankController);
exports.PiggybankController = PiggybankController;
//# sourceMappingURL=piggybank.controller.js.map