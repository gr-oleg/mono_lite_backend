import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

interface DepositCreationAttrs {
  user_id: number;
  amount: number;
  interest_rate: number;
  term: number;
  status: string;
  monthly_payment: number;
  end_date: Date;
}

@Table({ tableName: 'deposits' })
export class Deposit extends Model<Deposit, DepositCreationAttrs> {
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
  user_id: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  amount: number;

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
    defaultValue: 0,
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
    defaultValue: function () {
      const now = new Date();
      const futureDate = new Date(now.setMonth(now.getMonth() + 1));
      return futureDate;
    },
  })
  end_date: Date;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  })
  status: string;
}
