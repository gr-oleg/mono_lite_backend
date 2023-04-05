"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_controller_1 = require("./transactions.controller");
const sequelize_1 = require("@nestjs/sequelize");
const transactions_model_1 = require("./transactions.model");
const card_model_1 = require("../cards/card.model");
const cards_module_1 = require("../cards/cards.module");
const auth_module_1 = require("../auth/auth.module");
let TransactionsModule = class TransactionsModule {
};
TransactionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [transactions_controller_1.TransactionsController],
        providers: [transactions_service_1.TransactionsService],
        imports: [
            (0, common_1.forwardRef)(() => cards_module_1.CardsModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            sequelize_1.SequelizeModule.forFeature([transactions_model_1.Transaction, card_model_1.Card])
        ]
    })
], TransactionsModule);
exports.TransactionsModule = TransactionsModule;
//# sourceMappingURL=transactions.module.js.map