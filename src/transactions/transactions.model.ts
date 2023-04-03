// import {
//   Model,
//   Column,
//   DataType,
//   ForeignKey,
//   BelongsTo,
//   BeforeCreate,
//   Table,
// } from 'sequelize-typescript';
// import { Card } from '../cards/card.model';

// enum TransactionType {
//   DEBIT = 'DEBIT',
//   CREDIT = 'CREDIT',
// }

// enum TransactionStatus {
//   SUCCESSFUL = 'SUCCESSFUL',
//   FAILED = 'FAILED',
// }

// interface TransactionCreateAttrs{
//   transaction_amount: number;
//   transaction_description: string;
//   recipient_card_number: string;
// }

// @Table
// export class Transaction extends Model<Transaction, TransactionCreateAttrs> {
//   @Column({
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   })
//   transaction_id: number;

//   @ForeignKey(() => Card)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   sender_card_id: number;

//   @ForeignKey(() => Card)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   recipient_card_id: number;

//   @Column({
//     type: DataType.STRING,
//     allowNull: true,
//   })
//   transaction_description: string;

//   @Column({
//     type: DataType.FLOAT,
//     allowNull: false,
//   })
//   transaction_amount: number;

//   @Column({
//     type: DataType.ENUM(...Object.values(TransactionType)),
//     allowNull: false,
//   })
//   transaction_type: TransactionType;

//   @Column({
//     type: DataType.DATE,
//     allowNull: false,
//     defaultValue: DataType.NOW,
//   })
//   transaction_date: Date;

//   @Column({
//     type: DataType.ENUM('success', 'failure'),
//     allowNull: false,
//     defaultValue: 'success',
//   })
//   transaction_status: TransactionStatus;

//   @BelongsTo(() => Card, {
//     foreignKey: 'sender_card_id',
//     targetKey: 'card_id',
//   })
//   sender: Card;

//   @BelongsTo(() => Card, {
//     foreignKey: 'recipient_card_id',
//     targetKey: 'card_id',
//   })
//   recipient: Card;

//   @BeforeCreate
//   static setTransactionType(instance: Transaction) {
//     if (instance.transaction_amount < 0) {
//       instance.transaction_type = TransactionType.DEBIT;
//     } else {
//       instance.transaction_type = TransactionType.CREDIT;
//     }
//   }
// }
