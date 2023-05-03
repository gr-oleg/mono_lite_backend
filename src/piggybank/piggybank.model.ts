import sequelize from 'sequelize';
import { INTEGER } from 'sequelize';
import { DataTypes} from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';



interface PiggyBankCreationAttrs {
  user_id: number;
  target_sum: number;
  balance: number;
  vault_title: string;
  contributors: number;
}

@Table({ tableName: 'pigVault' })
export class PiggyBank extends Model<PiggyBank, PiggyBankCreationAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  vault_id: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  vault_title: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  target_sum: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.00,
  })
  vault_balance: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  contributors: number;
}
