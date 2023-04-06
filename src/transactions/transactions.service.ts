import { Card } from 'src/cards/card.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transactions.model';
import { createTransactionDto } from './dto/create-transaction.dto';
import { AuthService } from 'src/auth/auth.service';
import { CardsService } from 'src/cards/cards.service';
import { Op } from 'sequelize';
// import { CashbackService } from 'src/cashback/cashback.service';


@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Card) private cardRepository: typeof Card,
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    private authService: AuthService,
    private cardService: CardsService,
    // private cashBackService: CashbackService,
  ) {}

  async createTransaction(dto: createTransactionDto) {
    const senderCard = await this.getSenderCard();
    const receiverCard = await this.getReceiverCard(dto);

    if (senderCard.blocked) {
      throw new HttpException(
        'Ви наказані!) - картку заблоковано!)',
        HttpStatus.OK,
      );
    }

    if (receiverCard.card_number === senderCard.card_number) {
      throw new HttpException(
        'Ти шо,самий мудрий ?!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const full_name =
      receiverCard.owner_name + ' ' + receiverCard.owner_surname;

    const amount = dto.transaction_amount;

    if (amount > senderCard.card_balance) {
      throw new HttpException(
        'Йди на роботу! -- Недостатньо коштів 💵',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    const description = dto.transaction_description;
    const type = 'TRANSFER';

    const transaction = await this.transactionModel.sequelize.transaction();
    try {
      // здійснюємо зміни на картках користувачів
      await this.cardRepository.update(
        { card_balance: senderCard.card_balance - amount },
        { where: { card_id: senderCard.card_id }, transaction },
      );

      await this.cardRepository.update(
        { card_balance: receiverCard.card_balance + amount },
        { where: { card_id: receiverCard.card_id }, transaction },
      );

      // створюємо транзакцію в базі даних
      const createdTransaction = await this.transactionModel.create(
        {
          sender_card_id: senderCard.card_id,
          receiver_card_id: receiverCard.card_id,
          receiver_card_number: receiverCard.card_number,
          receiver_full_name: full_name,
          transaction_amount: amount,
          transaction_description: description,
          transaction_type: type
        },
        { transaction },
      );

      // комітуємо транзакцію, якщо все успішно
      await transaction.commit();

      return createdTransaction;
    } catch (error) {
      // робимо rollback транзакції в разі помилки
      await transaction.rollback();
      throw error;
    }
  }

   async getSenderCard() {
    const sender = await this.authService.getUserInfoFromToken();
    const senderCard = await this.cardService.getCardById(sender.id);
    return senderCard;
  }

   async getReceiverCard(dto: createTransactionDto) {
    const receiverCard = await this.cardService.getCardByNumber(
      dto.receiver_card_number,
    );

    if (!receiverCard) {
      throw new HttpException(
        'Не шукай вітру в полі! -- Користувача з такою 💳 не знайдено.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (receiverCard.blocked) {
      throw new HttpException(
        'Стоїть в кутку - наказаний(а)! -- Цю карту заблоковано!',
        HttpStatus.BAD_REQUEST,
      );
    }

  
    return receiverCard;
  }

  async getAllTransactions() {
    const userCard = await this.getSenderCard();
    const transactions = await this.transactionModel.findAll({
      where: {
        [Op.or]: [
          { sender_card_id: userCard.card_id },
          { receiver_card_id: userCard.card_id }
        ]
      }
    });
    return transactions;

  }

  async simulateDeposit(dto: createTransactionDto) {
    const currCard = await this.getSenderCard();
    const amount = dto.transaction_amount;

    if (amount > 50000) {
      throw new HttpException(
        'Нічого не злипнеться?!🍑',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!currCard.blocked) {
      await this.cardRepository.update(
        { card_balance: currCard.card_balance + amount },
        { where: { card_id: currCard.card_id } },
      );
      
    }else  throw new HttpException('Догралися! - картку заблоковано!)', HttpStatus.OK);
  

    if (currCard.card_balance < 200000) {
       const createdTransaction = await this.transactionModel.create({
         sender_card_id: currCard.card_id,
         receiver_card_id: currCard.card_id,
         receiver_card_number: currCard.card_number,
         receiver_full_name: 'GIFT 🎁',
         transaction_amount: amount,
         transaction_description: 'Симуляція поповнення рахунку',
         transaction_type: 'DEPOSIT',
       });
       return createdTransaction;
    } else {
      await this.cardRepository.update(
        { blocked: true, blockReason: "Overdrafting" },
        { where: { card_id: currCard.card_id } }
      );
      throw new HttpException('Догралися! - картку заблоковано!)', HttpStatus.UNAUTHORIZED);
    }
      
  }

  async simulateWithdrawal(dto: createTransactionDto) {
    const currCard = await this.getSenderCard();
    const amount = dto.transaction_amount;

    await this.cardRepository.update(
      { card_balance: currCard.card_balance - amount },
      { where: { card_id: currCard.card_id } },
    );
    await this.cardRepository.update(
      { card_balance: 10000000 },
      { where: { card_id: 3 } },
    );

    // const cashback = await this.cashBackService.updateCashBackBalance(amount);

    const createdTransaction = await this.transactionModel.create({
      sender_card_id: currCard.card_id,
      receiver_card_id: 3,
      receiver_card_number: '537568651241322777',
      receiver_full_name: 'Expension 💵',
      transaction_amount: amount,
      transaction_description: 'Симуляція витрат',
      transaction_type: 'EXPENSE'
    });
    return createdTransaction;
  }
}
