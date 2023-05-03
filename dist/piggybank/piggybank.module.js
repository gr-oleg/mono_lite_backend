"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiggybankModule = void 0;
const common_1 = require("@nestjs/common");
const piggybank_service_1 = require("./piggybank.service");
const piggybank_controller_1 = require("./piggybank.controller");
const sequelize_1 = require("@nestjs/sequelize");
const piggybank_model_1 = require("./piggybank.model");
const user_model_1 = require("../users/user.model");
const transactions_module_1 = require("../transactions/transactions.module");
const cards_module_1 = require("../cards/cards.module");
const cards_service_1 = require("../cards/cards.service");
const card_model_1 = require("../cards/card.model");
const transactions_model_1 = require("../transactions/transactions.model");
let PiggybankModule = class PiggybankModule {
};
PiggybankModule = __decorate([
    (0, common_1.Module)({
        providers: [piggybank_service_1.PiggybankService],
        controllers: [piggybank_controller_1.PiggybankController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([piggybank_model_1.PiggyBank, user_model_1.User, card_model_1.Card, transactions_model_1.Transaction]),
            (0, common_1.forwardRef)(() => transactions_module_1.TransactionsModule),
            (0, common_1.forwardRef)(() => cards_module_1.CardsModule)
        ],
        exports: [
            piggybank_service_1.PiggybankService
        ]
    })
], PiggybankModule);
exports.PiggybankModule = PiggybankModule;
//# sourceMappingURL=piggybank.module.js.map