import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deposit } from './deposit.model';
import { Card } from 'src/cards/card.model';
import { Transaction } from 'src/transactions/transactions.model';
import { createDepositDto } from './dto/createDeposit.dto';
import { Op } from 'sequelize';

@Injectable()
export class DepositsService {
  constructor(
    @InjectModel(Deposit) private depositModel: typeof Deposit,
    @InjectModel(Card) private cardModel: typeof Card,
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
  ) {}

  // Declare a variable to hold the interval ID
  private intervalId: any;

  // Method to start the timer
  startTimer() {
    // Set the interval to run every 30 days (in milliseconds)
    const intervalDuration = 30 * 24 * 60 * 60 * 1000;
    this.intervalId = setInterval(() => {
      // Call the payPercentage method for each deposit in the database
      this.depositModel.findAll().then((deposits) => {
        deposits.forEach((deposit) => {
          this.payPercentage(deposit);
        });
      });
    }, intervalDuration);

    // Stop the timer for users whose end_date has passed
    this.depositModel
      .findAll({ where: { end_date: { [Op.lte]: new Date() } } })
      .then((deposits) => {
        deposits.forEach((deposit) => {
          clearInterval(this.intervalId);
        });
      });
  }

  async createDeposit(dto: createDepositDto) {
    const depositVault = await this.depositModel.create(dto);
    await this.calcMonthlyPayment(depositVault);
    this.startTimer();
    return depositVault;
  }

  async makeTransaction(operation: string, id: number, amount: number) {
    const currCard = await this.cardModel.findByPk(id);
    const fullName = currCard.owner_name + ' ' + currCard.owner_surname;
    const description =
      operation === 'deposit' ? 'Bank deposit💵' : 'Dividends🎉';
    const receiverCard =
      operation === 'deposit' ? 'Mono-Card' : currCard.card_number;

    if (operation === 'deposit') {
      await currCard.update({ card_balance: currCard.card_balance - amount });
      const createdTransaction = await this.transactionModel.create({
        sender_card_id: currCard.card_id,
        sender_full_name: fullName,
        receiver_card_id: Math.random(),
        receiver_card_number: receiverCard,
        receiver_full_name: 'Deposit',
        transaction_amount: amount,
        transaction_description: description,
        transaction_type: 'deposit',
      });
      return createdTransaction;
    }
    if (operation === 'dividends') {
      await currCard.update({ card_balance: currCard.card_balance + amount });
      const createdTransaction = await this.transactionModel.create({
        sender_card_id: Math.random(),
        sender_full_name: 'Dividents',
        receiver_card_id: Math.random(),
        receiver_card_number: receiverCard,
        receiver_full_name: fullName,
        transaction_amount: amount,
        transaction_description: description,
        transaction_type: 'deposit',
      });
      return createdTransaction;
    }
  }

  async updateAmountOfDeposit(dto: createDepositDto) {
    const currVault = this.depositModel.findOne({
      where: { user_id: dto.user_id },
    });

    const updatedVault = (await currVault).update({
      amount: (await currVault).amount + dto.amount,
    });
    await this.calcMonthlyPayment(await updatedVault);
    return updatedVault;
  }

  async payPercentage(vault: Deposit) {
    const amount = vault.monthly_payment;

    await this.makeTransaction('dividends', vault.user_id, amount);
  }

  async calcMonthlyPayment(vault: Deposit) {
    const totalAmount = vault.amount;
    const termInMonths = vault.term;

    // Calculate monthly interest rate
    const monthlyInterestRate = vault.interest_rate / 12;

    // Calculate monthly payment using formula
    const monthlyPayment =
      (totalAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, termInMonths)) /
      (Math.pow(1 + monthlyInterestRate, termInMonths) - 1);

    // Update deposit with new monthly payment value
    const updatedVault = await vault.update({
      monthly_payment: monthlyPayment,
    });

    return updatedVault;
  }
    
    async showUserVaults(id: number) {
        const vaults = await this.depositModel.findAll({ where: { user_id: id } })
        return vaults
  }  
    async showAllVaults() {
        const vaults = await this.depositModel.findAll()
        return vaults
  }  
    
}
