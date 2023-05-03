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
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "showVaults", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "createVault", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "addContributor", null);
__decorate([
    (0, common_1.Post)('/remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "removeContributor", null);
__decorate([
    (0, common_1.Post)('/break'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "breakVault", null);
__decorate([
    (0, common_1.Post)('/deposit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "depositToVault", null);
__decorate([
    (0, common_1.Post)('/withdraw'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Pig_Vault_dto_1.createPigVaultDto]),
    __metadata("design:returntype", void 0)
], PiggybankController.prototype, "withdrawFromVault", null);
PiggybankController = __decorate([
    (0, common_1.Controller)('piggybank'),
    __metadata("design:paramtypes", [piggybank_service_1.PiggybankService])
], PiggybankController);
exports.PiggybankController = PiggybankController;
//# sourceMappingURL=piggybank.controller.js.map