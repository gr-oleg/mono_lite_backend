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
exports.PiggybankService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const piggybank_model_1 = require("./piggybank.model");
const card_model_1 = require("../cards/card.model");
const cards_service_1 = require("../cards/cards.service");
const transactions_model_1 = require("../transactions/transactions.model");
const sequelize_2 = require("sequelize");
let PiggybankService = class PiggybankService {
    constructor(vaultModel, cardModel, transactionsModel, cardService) {
        this.vaultModel = vaultModel;
        this.cardModel = cardModel;
        this.transactionsModel = transactionsModel;
        this.cardService = cardService;
    }
    async createVault(dto) {
        const vault = await this.vaultModel.create({
            user_id: dto.user_id,
            target_sum: dto.target_sum,
            vault_title: dto.vault_title,
        });
        return vault;
    }
    async depositToVault(dto) {
        const targetVault = await this.vaultModel.findOne({
            where: { vault_id: dto.vault_id },
        });
        const amount = dto.amount;
        const currCard = await this.cardService.getCardById(dto.user_id);
        const isEnough = amount <= currCard.card_balance;
        const full_name = currCard.owner_name + ' ' + currCard.owner_surname;
        if (targetVault && currCard && isEnough) {
            await this.cardModel.update({ card_balance: currCard.card_balance - amount }, { where: { card_id: currCard.card_id } });
            await this.vaultModel.update({ vault_balance: targetVault.vault_balance + amount }, { where: { vault_id: targetVault.vault_id } });
            const createdTransaction = await this.transactionsModel.create({
                sender_card_id: currCard.card_id,
                sender_full_name: full_name,
                receiver_card_id: Math.random(),
                receiver_card_number: ' ',
                receiver_full_name: targetVault.vault_title,
                transaction_amount: amount,
                transaction_description: `Поповнення моно-банки: ${targetVault.vault_title}`,
                transaction_type: 'PIG-BANK',
            });
            return createdTransaction;
        }
    }
    async withdrawFromVault(dto) {
        const targetVault = await this.vaultModel.findOne({
            where: { vault_id: dto.vault_id },
        });
        const isOwner = targetVault.user_id === dto.user_id;
        const amount = dto.amount;
        const currCard = await this.cardService.getCardById(dto.user_id);
        const isEnough = amount <= targetVault.vault_balance;
        const full_name = currCard.owner_name + ' ' + currCard.owner_surname;
        if (targetVault && currCard && isEnough && isOwner) {
            await this.cardModel.update({ card_balance: currCard.card_balance + amount }, { where: { card_id: currCard.card_id } });
            await this.vaultModel.update({ vault_balance: targetVault.vault_balance - amount }, { where: { vault_id: targetVault.vault_id } });
            const createdTransaction = await this.transactionsModel.create({
                sender_card_id: currCard.card_id,
                sender_full_name: full_name,
                receiver_card_id: Math.random(),
                receiver_card_number: ' ',
                receiver_full_name: targetVault.vault_title,
                transaction_amount: amount,
                transaction_description: `Зняття частини з банки: ${targetVault.vault_title}`,
                transaction_type: 'PIG-BANK',
            });
            return createdTransaction;
        }
        if (!isEnough) {
            throw new common_1.BadRequestException('Недостатньо грошей у банці! ');
        }
        if (!isOwner) {
            throw new common_1.BadRequestException('Не твоє не чіпай!');
        }
    }
    async breakVault(dto) {
        const targetVault = await this.vaultModel.findOne({
            where: { vault_id: dto.vault_id },
        });
        const currCard = await this.cardService.getCardById(dto.user_id);
        const full_name = currCard.owner_name + ' ' + currCard.owner_surname;
        try {
            if (targetVault.user_id === dto.user_id) {
                await this.cardModel.update({ card_balance: currCard.card_balance + targetVault.vault_balance }, { where: { card_id: currCard.card_id } });
                const createdTransaction = await this.transactionsModel.create({
                    sender_card_id: Math.random(),
                    sender_full_name: targetVault.vault_title,
                    receiver_card_id: currCard.card_id,
                    receiver_card_number: currCard.card_number,
                    receiver_full_name: full_name,
                    transaction_amount: targetVault.vault_balance,
                    transaction_description: `Розбиття банки: ${targetVault.vault_title}`,
                    transaction_type: 'PIG-BANK',
                });
                await this.vaultModel.destroy({ where: { vault_id: dto.vault_id } });
                return createdTransaction;
            }
        }
        catch (error) {
            throw new common_1.ConflictException('Не твоє не чіпай!');
        }
    }
    async showUserVaults(user_id) {
        const vaults = await this.vaultModel.findAll({
            where: {
                [sequelize_2.Op.or]: [{ user_id: user_id }, { contributors: user_id }],
            },
        });
        return vaults;
    }
    async changeVaultTitle(dto) {
        const targetVault = await this.vaultModel.findByPk(dto.vault_id);
        const isOwner = dto.user_id === targetVault.user_id;
        if (targetVault && isOwner) {
            const updatedVault = await this.vaultModel.update({ vault_title: dto.vault_title }, { where: { vault_id: targetVault.vault_id } });
            return updatedVault;
        }
        else
            throw new common_1.NotFoundException('Vault does not exist');
    }
    async getAllVaults() {
        return await this.vaultModel.findAll();
    }
    async addContributor(dto) {
        const targetVault = await this.vaultModel.findOne({
            where: { id: dto.vault_id },
        });
        if (!targetVault) {
            throw new Error(`PigVault with id ${dto.vault_id} not found.`);
        }
        const isOwner = targetVault.user_id === dto.user_id;
        if (!isOwner) {
            const updatedVault = await this.vaultModel.update({ contributors: dto.user_id }, { where: { vault_id: targetVault.vault_id } });
            return updatedVault;
        }
        else
            throw new common_1.ConflictException('Not allowed!');
    }
    async removeContributor(dto) {
        const targetVault = await this.vaultModel.findOne({
            where: { id: dto.vault_id },
        });
        if (!targetVault) {
            throw new Error(`PigVault with id ${dto.vault_id} not found.`);
        }
        const updatedVault = await this.vaultModel.update({ contributors: null }, { where: { vault_id: dto.vault_id } });
        return updatedVault;
    }
};
PiggybankService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(piggybank_model_1.PiggyBank)),
    __param(1, (0, sequelize_1.InjectModel)(card_model_1.Card)),
    __param(2, (0, sequelize_1.InjectModel)(transactions_model_1.Transaction)),
    __metadata("design:paramtypes", [Object, Object, Object, cards_service_1.CardsService])
], PiggybankService);
exports.PiggybankService = PiggybankService;
//# sourceMappingURL=piggybank.service.js.map