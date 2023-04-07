import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CashBack } from './cashback.model';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CashBackDto } from './dto/cashBack.dto';
import { Transaction } from 'src/transactions/transactions.model';
import { Card } from 'src/cards/card.model';

@Injectable()
export class CashbackService {

    constructor(@InjectModel(CashBack) private cashbackModel: typeof CashBack,
                @InjectModel(Transaction) private transactionModel: typeof Transaction,
                @InjectModel(Card) private cardModel: typeof Card,
    private transactionService: TransactionsService) { }

    async createCashBackStorage() {
        const card = await this.transactionService.getCurrentCard();
        const currCard = await this.cashbackModel.findOne({ where: { card_id: card.card_id } })
        if (!currCard) {
            const currCard = await this.cashbackModel.create({
                card_id: card.card_id,
                cashback_balance: 0
            })
            return currCard;
        } 
        return currCard;
    }

    async updateCashBackBalance() {
        const currCard = await this.createCashBackStorage();
         const sortedTransactions = await this.transactionModel.findAll({where:{sender_card_id: currCard.card_id, transaction_type: "EXPENSE"}})
        const cashBack = sortedTransactions.forEach(async transaction => {
            if (transaction.transaction_type == "EXPENSE") {
                const percentageAmount = transaction.transaction_amount * 0.02;
              await this.cashbackModel.update({ cashback_balance: currCard.cashback_balance + percentageAmount },
                  { where: { card_id: currCard.card_id } })
            }
            return cashBack;
        })
   
    }

    async getCashBackToBalance(dto: CashBackDto) {
        const amount = dto.amount;
        const currCard = await this.transactionService.getCurrentCard()
        const currStorage = await this.cashbackModel.findOne({
          where: { card_id: currCard.card_id },
        });

        if (currStorage.cashback_balance >= 100 && currStorage.cashback_balance >= amount) {
            await this.cardModel.update(
                { card_balance: currCard.card_balance + amount * 0.15 },
                { where: { card_id: currCard.card_id } }
            );

            const transaction = await this.transactionModel.create({
              sender_card_id: Math.random(),
              receiver_card_id: currCard.card_id,
              receiver_card_number: currCard.card_number,
              receiver_full_name: currCard.owner_name + ' ' + currCard.owner_surname,
              transaction_amount: amount * 0.15,
              transaction_description: 'Кешбек🎉💵',
              transaction_type: 'CASH-BACK',
            });

            return transaction;
        }
        else if (currStorage.cashback_balance < amount) {
            throw new HttpException('Ти кого хочеш намахати?',HttpStatus.BAD_REQUEST)
        }
    }

    async showBalance() {
        await this.updateCashBackBalance();
        const currCard = await this.transactionService.getCurrentCard();
        const currStorage = await this.cashbackModel.findOne({
          where: { card_id: currCard.card_id },
        });
        const balance = currStorage.cashback_balance;
        return balance;
    }
}
