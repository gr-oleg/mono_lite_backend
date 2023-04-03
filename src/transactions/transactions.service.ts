// import { Card } from "src/cards/card.model";
// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/sequelize";
// import { Transaction } from "./transactions.model";

// @Injectable()
// export class TransactionsService {
//   constructor(
//     @InjectModel(Card)
//     private cardModel: typeof Card,
//   ) {}

//   async createTransaction(
//     senderUserId: number,
//     receiverCardNumber: string,
//     amount: number,
//     description?: string,
//   ) {
//     const senderCard = await this.cardModel.findOne({
//       where: { user_id: senderUserId },
//     });
//     if (!senderCard) {
//       throw new Error('Sender card not found');
//     }

//     const receiverCard = await this.cardModel.findOne({
//       where: { card_number: receiverCardNumber },
//     });
//     if (!receiverCard) {
//       throw new Error('Receiver card not found');
//     }

//     const transaction = new Transaction({
//       transaction_amount: amount,
//       transaction_description: description,
//       sender_card_id: senderCard.card_id,
//       recipient_card_id: receiverCard.card_id,
//     });

//     await transaction.save();

//     // проведення переказу коштів з картки відправника на картку отримувача

//     return transaction;
//   }
// }
