"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const user_model_1 = require("./users/user.model");
const card_model_1 = require("./cards/card.model");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const cards_module_1 = require("./cards/cards.module");
const transactions_module_1 = require("./transactions/transactions.module");
const tedious = require("tedious");
const transactions_model_1 = require("./transactions/transactions.model");
const auth_module_1 = require("./auth/auth.module");
const piggybank_module_1 = require("./piggybank/piggybank.module");
const cashback_module_1 = require("./cashback/cashback.module");
const cashback_model_1 = require("./cashback/cashback.model");
const piggybank_model_1 = require("./piggybank/piggybank.model");
const loans_module_1 = require("./loans/loans.module");
const deposits_module_1 = require("./deposits/deposits.module");
const loans_model_1 = require("./loans/loans.model");
const deposit_model_1 = require("./deposits/deposit.model");
const schedule_1 = require("@nestjs/schedule");
const currency_module_1 = require("./currency/currency.module");
const currency_model_1 = require("./currency/currency.model");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        imports: [
            config_1.ConfigModule.forRoot({}),
            schedule_1.ScheduleModule.forRoot(),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: () => ({
                    dialect: 'mssql',
                    dialectModule: tedious,
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    host: process.env.DB_HOST,
                    port: 1433,
                    database: process.env.DB,
                    dialectOptions: {
                        driver: {
                            version: 'ODBC Driver 18 for SQL Server',
                        },
                        options: {
                            encrypt: true,
                            authentication: {
                                type: 'azure-active-directory-msi-app-service',
                            },
                        },
                        encrypt: true,
                        trustServerCertificate: false,
                    },
                    models: [user_model_1.User, card_model_1.Card, transactions_model_1.Transaction, cashback_model_1.CashBack, piggybank_model_1.PiggyBank, loans_model_1.Loan, deposit_model_1.Deposit, currency_model_1.Currency],
                    autoLoadModels: true,
                }),
            }),
            users_module_1.UsersModule,
            cards_module_1.CardsModule,
            auth_module_1.AuthModule,
            transactions_module_1.TransactionsModule,
            piggybank_module_1.PiggybankModule,
            cashback_module_1.CashbackModule,
            loans_module_1.LoansModule,
            deposits_module_1.DepositsModule,
            currency_module_1.CurrencyModule,
        ],
        exports: [
            auth_module_1.AuthModule,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map