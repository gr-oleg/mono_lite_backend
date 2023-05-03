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
exports.TransactionsService = void 0;
const card_model_1 = require("../cards/card.model");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const transactions_model_1 = require("./transactions.model");
const auth_service_1 = require("../auth/auth.service");
const cards_service_1 = require("../cards/cards.service");
const sequelize_2 = require("sequelize");
const cashback_model_1 = require("../cashback/cashback.model");
let TransactionsService = class TransactionsService {
    constructor(cardRepository, transactionModel, cashBackModel, authService, cardService) {
        this.cardRepository = cardRepository;
        this.transactionModel = transactionModel;
        this.cashBackModel = cashBackModel;
        this.authService = authService;
        this.cardService = cardService;
    }
    async createTransaction(dto) {
        const senderCard = await this.getCurrentCard(dto.user_id);
        const receiverCard = await this.getReceiverCard(dto);
        if (senderCard.blocked) {
            throw new common_1.ConflictException('Ви наказані!) - картку заблоковано!)');
        }
        if (receiverCard.card_number === senderCard.card_number) {
            throw new common_1.ConflictException('Ти шо,самий мудрий ?!');
        }
        const sender_full_name = senderCard.owner_name + ' ' + senderCard.owner_surname;
        const full_name = receiverCard.owner_name + ' ' + receiverCard.owner_surname;
        const amount = dto.transaction_amount;
        if (amount > senderCard.card_balance) {
            throw new common_1.ConflictException('Йди на роботу! -- Недостатньо коштів 💵');
        }
        const description = dto.transaction_description;
        const type = 'TRANSFER';
        const transaction = await this.transactionModel.sequelize.transaction();
        try {
            await this.cardRepository.update({ card_balance: senderCard.card_balance - amount }, { where: { card_id: senderCard.card_id }, transaction });
            await this.cardRepository.update({ card_balance: +receiverCard.card_balance + +amount }, { where: { card_id: receiverCard.card_id }, transaction });
            const createdTransaction = await this.transactionModel.create({
                sender_card_id: senderCard.card_id,
                sender_full_name: sender_full_name,
                receiver_card_id: receiverCard.card_id,
                receiver_card_number: receiverCard.card_number,
                receiver_full_name: full_name,
                transaction_amount: amount,
                transaction_description: description,
                transaction_type: type,
            }, { transaction });
            await transaction.commit();
            return createdTransaction;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async getCurrentCard(id) {
        const currCard = await this.cardService.getCardById(id);
        return currCard;
    }
    async getReceiverCard(dto) {
        const receiverCard = await this.cardService.getCardByNumber(dto.receiver_card_number);
        if (!receiverCard) {
            throw new common_1.NotFoundException('Не шукай вітру в полі! -- Користувача з такою 💳 не знайдено.');
        }
        if (receiverCard.blocked) {
            throw new common_1.ConflictException('Стоїть в кутку - наказаний(а)! -- Цю карту заблоковано!');
        }
        return receiverCard;
    }
    async getUsersTransactions(id) {
        console.log(id);
        const userCard = await this.getCurrentCard(id);
        const transactions = await this.transactionModel.findAll({
            where: {
                [sequelize_2.Op.or]: [
                    { sender_card_id: userCard.card_id },
                    { receiver_card_id: userCard.card_id },
                ],
            },
        });
        return transactions;
    }
    async simulateDeposit(dto) {
        const currCard = await this.getCurrentCard(dto.user_id);
        const amount = dto.transaction_amount;
        const full_name = currCard.owner_name + ' ' + currCard.owner_surname;
        if (amount > 50000) {
            throw new common_1.ConflictException('Нічого не злипнеться?!🍑');
        }
        if (!currCard.blocked) {
            await this.cardRepository.update({ card_balance: +currCard.card_balance + +amount }, { where: { card_id: currCard.card_id } });
        }
        else
            throw new common_1.ConflictException('Догралися! - картку заблоковано!)');
        if (currCard.card_balance < 200000) {
            const createdTransaction = await this.transactionModel.create({
                sender_card_id: currCard.card_id,
                sender_full_name: full_name,
                receiver_card_id: currCard.card_id,
                receiver_card_number: currCard.card_number,
                receiver_full_name: 'GIFT 🎁',
                transaction_amount: amount,
                transaction_description: 'Симуляція поповнення рахунку',
                transaction_type: 'DEPOSIT',
            });
            return createdTransaction;
        }
        else {
            await this.cardRepository.update({ blocked: true, blockReason: 'Overdrafting' }, { where: { card_id: currCard.card_id } });
            throw new common_1.ConflictException('Догралися! - картку заблоковано!)');
        }
    }
    async simulateWithdrawal(dto) {
        const currCard = await this.getCurrentCard(dto.user_id);
        const amount = dto.transaction_amount;
        const full_name = currCard.owner_name + ' ' + currCard.owner_surname;
        if (+amount <= +currCard.card_balance) {
            await this.cardRepository.update({ card_balance: currCard.card_balance - amount }, { where: { card_id: currCard.card_id } });
            await this.updateCashBackBalance(dto);
            const createdTransaction = await this.transactionModel.create({
                sender_card_id: currCard.card_id,
                sender_full_name: full_name,
                receiver_card_id: Math.random(),
                receiver_card_number: '537568651241322777',
                receiver_full_name: 'Expension 💵',
                transaction_amount: amount,
                transaction_description: 'Симуляція витрат',
                transaction_type: 'EXPENSE',
            });
            return createdTransaction;
        }
        const dontEnough = amount - currCard.card_balance;
        throw new common_1.ConflictException(`До повного щастя вам бракує ${dontEnough} ₴`);
    }
    async getAllTransactions() {
        const transactions = await this.transactionModel.findAll();
        return transactions;
    }
    async updateCashBackBalance(dto) {
        const currCard = await this.getCurrentCard(dto.user_id);
        const amount = +dto.transaction_amount;
        const [currCashBackVault, created] = await this.cashBackModel.findOrCreate({
            where: { card_id: currCard.card_id },
            defaults: { cashback_balance: 0 },
        });
        await this.cashBackModel.update({
            cashback_balance: currCashBackVault.cashback_balance + +amount * 0.02,
        }, { where: { card_id: currCard.card_id } });
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(card_model_1.Card)),
    __param(1, (0, sequelize_1.InjectModel)(transactions_model_1.Transaction)),
    __param(2, (0, sequelize_1.InjectModel)(cashback_model_1.CashBack)),
    __metadata("design:paramtypes", [Object, Object, Object, auth_service_1.AuthService,
        cards_service_1.CardsService])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map