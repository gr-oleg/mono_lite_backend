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
exports.Transaction = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const card_model_1 = require("../cards/card.model");
const sequelize_1 = require("sequelize");
const swagger_1 = require("@nestjs/swagger");
let Transaction = class Transaction extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Transaction ID' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "transaction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Sender Card ID' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "sender_card_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Sender Full Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "sender_full_name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => card_model_1.Card),
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Receiver Card ID' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "receiver_card_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1234567890123456',
        description: 'Receiver Card Number',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "receiver_card_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Smith', description: 'Receiver Full Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "receiver_full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Payment for services',
        description: 'Transaction Description',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "transaction_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Transaction Amount' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "transaction_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'deposit', description: 'Transaction Type' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "transaction_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-05-16T12:00:00.000Z',
        description: 'Transaction Date',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    }),
    __metadata("design:type", Date)
], Transaction.prototype, "transaction_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SUCCESSFUL', description: 'Transaction Status' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'success',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "transaction_status", void 0);
Transaction = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Transaction' })
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=transactions.model.js.map