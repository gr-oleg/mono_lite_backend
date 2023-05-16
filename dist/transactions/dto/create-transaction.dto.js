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
exports.createTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class createTransactionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'User ID' }),
    __metadata("design:type", Number)
], createTransactionDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Transaction amount' }),
    __metadata("design:type", Number)
], createTransactionDto.prototype, "transaction_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Payment for services',
        description: 'Transaction description',
    }),
    __metadata("design:type", String)
], createTransactionDto.prototype, "transaction_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '5375498249717684',
        description: 'Receiver card number',
    }),
    __metadata("design:type", String)
], createTransactionDto.prototype, "receiver_card_number", void 0);
exports.createTransactionDto = createTransactionDto;
//# sourceMappingURL=create-transaction.dto.js.map