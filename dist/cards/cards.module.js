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
let CardsModule = class CardsModule {
};
CardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [cards_controller_1.CardsController],
        providers: [cards_service_1.CardsService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([card_model_1.Card, user_model_1.User])
        ]
    })
], CardsModule);
exports.CardsModule = CardsModule;
//# sourceMappingURL=cards.module.js.map