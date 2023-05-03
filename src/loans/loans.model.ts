import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

interface LoanCreationAttrs {
  borrower_id: number;
  amount: number;
  interest_rate: number;
  term: number;
  status: string;
  amount_to_pay: number;
  monthly_payment: number;
  end_date: Date;
}

@Table({ tableName: 'loans' })
export class Loan extends Model<Loan, LoanCreationAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  borrower_id: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: function () {
      return this.amount;
    },
  })
  amount_to_pay: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  interest_rate: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  term: number;
  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1500,
  })
  monthly_payment: number;

  @Column({
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: new Date(),
  })
  start_date: Date;

  @Column({
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: () => {
      const now = new Date();
      const futureDate = new Date(now.setFullYear(now.getFullYear() + 1));
      return futureDate;
    },
  })
  end_date: Date;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'success',
  })
  status: string;
}
