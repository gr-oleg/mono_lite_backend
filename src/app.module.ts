import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.model';
import { Card } from './cards/card.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { TransactionsModule } from './transactions/transactions.module';
import * as tedious from 'tedious';
import { Transaction } from './transactions/transactions.model';
import { AuthModule } from './auth/auth.module';
import { PiggybankModule } from './piggybank/piggybank.module';
import { CashbackModule } from './cashback/cashback.module';
import { CashBack } from './cashback/cashback.model';
import { PiggyBank } from './piggybank/piggybank.model';
import { LoansService } from './loans/loans.service';
import { LoansModule } from './loans/loans.module';
import { DepositsController } from './deposits/deposits.controller';
import { DepositsService } from './deposits/deposits.service';
import { DepositsModule } from './deposits/deposits.module';
import { Loan } from './loans/loans.model';
import { Deposit } from './deposits/deposit.model';



@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({}),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
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
        models: [User, Card, Transaction,CashBack,PiggyBank,Loan,Deposit],
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    CardsModule,
    AuthModule,
    TransactionsModule,
    PiggybankModule,
    CashbackModule,
    LoansModule,
    DepositsModule,
  ],
  exports: [
    AuthModule,
  ]
})
export class AppModule {}
