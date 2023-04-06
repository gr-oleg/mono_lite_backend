"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../users/user.model");
const card_model_1 = require("./card.model");
const cards_controller_1 = require("./cards.controller");
const cards_service_1 = require("./cards.service");
const auth_module_1 = require("../auth/auth.module");
const transactions_module_1 = require("../transactions/transactions.module");
const cashback_module_1 = require("../cashback/cashback.module");
let CardsModule = class CardsModule {
};
CardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [cards_controller_1.CardsController],
        providers: [cards_service_1.CardsService],
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => transactions_module_1.TransactionsModule),
            (0, common_1.forwardRef)(() => cashback_module_1.CashbackModule),
            sequelize_1.SequelizeModule.forFeature([card_model_1.Card, user_model_1.User])
        ],
        exports: [
            cards_service_1.CardsService
        ]
    })
], CardsModule);
exports.CardsModule = CardsModule;
//# sourceMappingURL=cards.module.js.map