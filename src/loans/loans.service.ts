import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Loan } from './loans.model';
import { createLoanDto } from './dto/createLoan.dto';
import { Transaction } from 'src/transactions/transactions.model';
import { Card } from 'src/cards/card.model';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(Loan) private loanModel: typeof Loan,
    @InjectModel(Card) private cardModel: typeof Card,
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
  ) {}

  async createLoan(dto: createLoanDto): Promise<Loan> {
    const loan = await this.loanModel.create(dto);
    const monthlyPayment = this.calculateMonthlyPayment(
      dto.amount,
      dto.interest_rate,
      dto.term,
    );
    loan.update({ monthly_payment: monthlyPayment });

    const initialAmountToPay = monthlyPayment;
    let currentAmountToPay = initialAmountToPay;

    for (let i = 1; i <= dto.term; i++) {
      setTimeout(async () => {
        currentAmountToPay = Math.ceil(currentAmountToPay * 1.05);
        await this.increaseAmountToPay(loan.id, currentAmountToPay);
        loan.update({ monthly_payment: currentAmountToPay });
      }, i * 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
    }
    if (loan) {
      this.prepareTransaction('receive', dto);
    }

    return loan;
  }

  private calculateMonthlyPayment(
    amount: number,
    interestRate: number,
    term: number,
  ): number {
    const monthlyInterestRate = interestRate / 12;
    const payment =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -term));
    return Math.ceil(payment);
  }

  private async increaseAmountToPay(loanId: number, amountToIncrease: number) {
    const loan = await this.loanModel.findByPk(loanId);
    const newAmountToPay = loan.amount_to_pay + amountToIncrease;
    await loan.update({ amount_to_pay: newAmountToPay });
  }

  async prepareTransaction(operation: string, dto: createLoanDto) {
    const currCard = await this.cardModel.findByPk(dto.borrower_id);
    const full_name = currCard.owner_name + ' ' + currCard.owner_surname;
    const descriptionTxt =
      operation === 'receive'
        ? 'Отримання кредитування'
        : 'Сплата частини кредиту';

    const createdTransaction = await this.transactionModel.create({
      sender_card_id: Math.random(),
      sender_full_name: 'Mono-Loan',
      receiver_card_id: currCard.card_id,
      receiver_card_number: currCard.card_number,
      receiver_full_name: full_name,
      transaction_amount: dto.amount,
      transaction_description: `${descriptionTxt}`,
      transaction_type: 'LOAN',
    });

    if (operation === 'receive') {
      await this.cardModel.update(
        { card_balance: currCard.card_balance + dto.amount },
        { where: { card_id: currCard.card_id } },
      );
    }

    if (operation === 'payment') {
      await this.cardModel.update(
        { card_balance: currCard.card_balance - dto.amount },
        { where: { card_id: currCard.card_id } },
      );
    }

    return createdTransaction;
  }

  async payPartOfLoan(dto: createLoanDto) {
    const currLoanVault = await this.loanModel.findOne({
      where: { borrower_id: dto.borrower_id },
    });
    const currCard = await this.cardModel.findByPk(dto.borrower_id);

    const isEnough =
      dto.amount >= currLoanVault.monthly_payment &&
      dto.amount <= currCard.card_balance;

    if (isEnough) {
      return this.prepareTransaction('payment', dto);
    } else throw new ConflictException('Ховайся! Колєктори вже їдуть!');
  }
  async payFullLoan(dto: createLoanDto) {
    const currLoanVault = await this.loanModel.findOne({
      where: { borrower_id: dto.borrower_id },
    });
      
    const currCard = await this.cardModel.findByPk(dto.borrower_id);

    const isEnough =
      dto.amount >= currLoanVault.amount_to_pay &&
      dto.amount <= currCard.card_balance;

    if (isEnough) {
      return this.prepareTransaction('payment', dto);
    }
  }

  async showLoanEntity(id: number) {
    const loan = await this.loanModel.findOne({
      where: { borrower_id: id },
    });
    return loan;
  }
}
