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
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const card_model_1 = require("./card.model");
const user_model_1 = require("../users/user.model");
let CardsService = class CardsService {
    constructor(cardModel, userModel) {
        this.cardModel = cardModel;
        this.userModel = userModel;
    }
    async getCardById(card_id) {
        const card = await this.cardModel.findByPk(card_id);
        return card;
    }
    async createCard(user_id) {
        const user = await this.userModel.findByPk(user_id);
        if (!user) {
            throw Error('This User does not exist');
        }
        const cardNumber = await (0, card_model_1.generateUniqueCardNumber)();
        const codeCVV = await (0, card_model_1.generateCVV)();
        const card = await this.cardModel.create({
            user_id: user_id,
            owner_name: user.first_name,
            owner_surname: user.second_name,
            card_number: cardNumber,
            card_balance: 0,
            card_CVV: codeCVV,
            blocked: false,
            blockReason: '',
        });
        return card;
    }
    async getAllCards() {
        const cards = await this.cardModel.findAll();
        return cards;
    }
    async getCardsByUserId(user_id) {
        const card = await this.cardModel.findOne({ where: { user_id } });
        if (!card) {
        }
        return card;
    }
    async getCardByNumber(card_number) {
        const card = await this.cardModel.findOne({ where: { card_number } });
        if (!card) {
        }
        return card;
    }
};
CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(card_model_1.Card)),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, Object])
], CardsService);
exports.CardsService = CardsService;
//# sourceMappingURL=cards.service.js.map