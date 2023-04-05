import {
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  Table,
} from 'sequelize-typescript';
import { Card } from '../cards/card.model';



enum TransactionStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
}

interface TransactionCreateAttrs {
    sender_card_id: number;
    receiver_card_id: number;
    receiver_card_number: string; 
    receiver_full_name: string;
    transaction_amount: number;  
    transaction_description: string;  
    transaction_type: string;

    

}

@Table
export class Transaction extends Model<Transaction, TransactionCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  transaction_id: number;

//   @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sender_card_id: number;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  receiver_card_id: number;

 
    
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    receiver_card_number: string;
  
    @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    receiver_full_name: string;

  @Column({
    type: DataType.STRING,
      allowNull: true,
    defaultValue: ''
  })
  transaction_description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  transaction_amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transaction_type: string;
  

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  transaction_date: Date;

  @Column({
    type: DataType.ENUM('success', 'failure'),
    allowNull: false,
    defaultValue: 'success',
  })
  transaction_status: TransactionStatus;
}
