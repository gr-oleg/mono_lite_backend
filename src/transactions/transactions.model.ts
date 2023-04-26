import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Card } from '../cards/card.model';
import { DataTypes } from 'sequelize';

enum TransactionStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
}

interface TransactionCreateAttrs {
  sender_card_id: number;
  sender_full_name: string;
  receiver_card_id: number;
  receiver_card_number: string;
  receiver_full_name: string;
  transaction_amount: number;
  transaction_description: string;
  transaction_type: string;
}

@Table({ tableName: 'Transaction' })
export class Transaction extends Model<Transaction, TransactionCreateAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  transaction_id: number;

  //   @ForeignKey(() => Card)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  sender_card_id: number;
  
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  sender_full_name: string;

  @ForeignKey(() => Card)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  receiver_card_id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  receiver_card_number: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  receiver_full_name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  })
  transaction_description: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  transaction_amount: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  transaction_type: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  transaction_date: Date;

  @Column({
    type: DataTypes.ENUM('success', 'failure'),
    allowNull: false,
    defaultValue: 'success',
  })
  transaction_status: TransactionStatus;
}
