import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  AfterCreate,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({ tableName: 'cards' })
export class Card extends Model<Card> {
  @ApiProperty({ example: '1', description: 'unique identificator' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  card_id: number;
  @Column({
    type: DataType.INTEGER,
    unique: false,
    primaryKey: true,
  })
  user_id: number;

  @ApiProperty({ example: '5375...1826', description: 'Card Number' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  card_number: string;

  @ApiProperty({ example: '2000', description: 'Card Balance' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  card_balance: number;

  @ApiProperty({ example: '111', description: 'Secret CVV code' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  card_CVV: string;

  @ApiProperty({ example: 'Vitaliy', description: 'Card Owner Name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0,
  })
  owner_name: string;

  @ApiProperty({ example: 'Havrona', description: 'Card Owner Surname' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0,
  })
  owner_surname: string;

  @ApiProperty({ example: 'false', description: 'Is card blocked?' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  blocked: boolean;

  @ApiProperty({
    example: 'Overdrafting',
    description: 'Why card was blocked',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  blockReason: string;

  @ApiProperty({ example: '2000', description: 'Card Dollar Balance' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  card_dollar_balance: number;

  @ApiProperty({ example: '2000', description: 'Card Euro Balance' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  card_euro_balance: number;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
  })

  // @HasMany(() => )
  @BeforeCreate({})
  static async generateCardNumber(card: Card) {
    const cardNumber = await generateUniqueCardNumber();
  }

  @BelongsTo(() => User, 'user_id')
  user: User;

  @AfterCreate
  static async updateCardNumber(card: Card) {
    const user = await card.$get('user'); // отримати власника карти
    user.card_number = card.card_number; // оновити номер картки в користувача
    await user.save(); // зберегти зміни в базі даних
  }
}

export async function generateUniqueCardNumber(): Promise<string> {
  const MAX_ATTEMPTS = 20;
  let attempt = 0;

  while (attempt < MAX_ATTEMPTS) {
    const cardNumber = generateRandomCardNumber();
    const card = await Card.findOne({ where: { card_number: cardNumber } });
    if (!card) {
      return cardNumber;
    }
    attempt++;
  }

  throw new Error('Could not generate unique card number');
}

function generateRandomCardNumber(): string {
  const BIN = '5375'; // Bank Identification Number
  const randomNumber = Math.floor(Math.random() * 999999999999); // 14-digit random number
  const cardNumber =
    BIN + randomNumber.toString().padStart(14 - BIN.length, '0'); // 16-digit card number
  return cardNumber;
}


export async function generateCVV() {
    const firstNumber = Math.floor(Math.random() * 9) + '';
    const secondNumber = Math.floor(Math.random() * 9) + '';
    const thirdNumber = Math.floor(Math.random() * 9) + '';
    const CVV = firstNumber + secondNumber + thirdNumber;
    return CVV;
}