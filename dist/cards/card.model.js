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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCVV = exports.generateUniqueCardNumber = exports.Card = void 0;
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../users/user.model");
let Card = class Card extends sequelize_typescript_1.Model {
    static async generateCardNumber(card) {
        const cardNumber = await generateUniqueCardNumber();
    }
    static async updateCardNumber(card) {
        const user = await card.$get('user');
        user.card_number = card.card_number;
        await user.save();
    }
};
__decorate([
    (0, decorators_1.ApiProperty)({ example: '1', description: 'unique identificator' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Card.prototype, "card_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Card.prototype, "user_id", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({ example: '5375...1826', description: 'Card Number' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Card.prototype, "card_number", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({ example: '2000', description: 'Card Balance' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Card.prototype, "card_balance", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({ example: '111', description: 'Secret CVV code' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Card.prototype, "card_CVV", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({ example: 'Vitaliy', description: 'Card Owner Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", String)
], Card.prototype, "owner_name", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({ example: 'Havrona', description: 'Card Owner Surname' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: 0,
    }),
    __metadata("design:type", String)
], Card.prototype, "owner_surname", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({ example: 'false', description: 'Is card blocked?' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Card.prototype, "blocked", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        example: 'Overdrafting',
        description: 'Why card was blocked',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Card.prototype, "blockReason", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, 'user_id'),
    __metadata("design:type", user_model_1.User)
], Card.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, {
        foreignKey: 'user_id',
        targetKey: 'user_id',
    }),
    (0, sequelize_typescript_1.BeforeCreate)({}),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Card]),
    __metadata("design:returntype", Promise)
], Card, "generateCardNumber", null);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Card]),
    __metadata("design:returntype", Promise)
], Card, "updateCardNumber", null);
Card = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'cards' })
], Card);
exports.Card = Card;
async function generateUniqueCardNumber() {
    const MAX_ATTEMPTS = 20;
    let attempt = 0;
    while (attempt < MAX_ATTEMPTS) {
        const cardNumber = generateRandomCardNumber();
        const card = await Card.findOne({ where: { card_number: cardNumber } });
        if (!card) {
            return cardNumber;
        }
        attempt++;
    }
    throw new Error('Could not generate unique card number');
}
exports.generateUniqueCardNumber = generateUniqueCardNumber;
function generateRandomCardNumber() {
    const BIN = '5375';
    const randomNumber = Math.floor(Math.random() * 999999999999);
    const cardNumber = BIN + randomNumber.toString().padStart(14 - BIN.length, '0');
    return cardNumber;
}
async function generateCVV() {
    const firstNumber = Math.floor(Math.random() * 9) + '';
    const secondNumber = Math.floor(Math.random() * 9) + '';
    const thirdNumber = Math.floor(Math.random() * 9) + '';
    const CVV = firstNumber + secondNumber + thirdNumber;
    return CVV;
}
exports.generateCVV = generateCVV;
//# sourceMappingURL=card.model.js.map