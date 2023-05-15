import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

interface CurrencyCreationAttrs {
  currency_id: number;
  date: number;
  rateSell: number;
  rateBuy: number;
}

@Table({ tableName: 'currency' })
export class Currency extends Model<Currency, CurrencyCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identificator' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.INTEGER,
    unique: false,
    primaryKey: true,
    allowNull:true
  })
  currency_id: number;

  @ApiProperty({
    example: '65464124054(Unix time)',
    description: 'last updated date',
  })
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  date: number;

  @ApiProperty({ example: '36.6', description: 'Sell currency rate' })
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    defaultValue: 0,
  })
  rateSell: number;

  @ApiProperty({ example: '36.6', description: 'Buy currency rate' })
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    defaultValue: 0,
  })
  rateBuy: number;
}
