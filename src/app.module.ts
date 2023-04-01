import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.model';
import { Card } from './cards/card.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import * as tedious from 'tedious';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({}),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
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
        models: [User, Card],
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    CardsModule,
  ],
})
export class AppModule {}
