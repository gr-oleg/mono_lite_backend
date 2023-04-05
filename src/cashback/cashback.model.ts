import {
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  Table,
} from 'sequelize-typescript';


interface CashBackCreateAttr{
    card_id: number;
    cashback_balance: number;
}

@Table
export class CashBack extends Model<CashBack, CashBackCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    cashback_id: number;

    //   @ForeignKey(() => Card)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    card_id: number;
 
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        defaultValue:0
    })
    cashback_balance: number;

 
}

