import { Model } from 'sequelize-typescript';
declare enum TransactionStatus {
    SUCCESSFUL = "SUCCESSFUL",
    FAILED = "FAILED"
}
interface TransactionCreateAttrs {
    sender_card_id: number;
    receiver_card_id: number;
    receiver_card_number: string;
    receiver_full_name: string;
    transaction_amount: number;
    transaction_description: string;
    transaction_type: string;
}
export declare class Transaction extends Model<Transaction, TransactionCreateAttrs> {
    transaction_id: number;
    sender_card_id: number;
    receiver_card_id: number;
    receiver_card_number: string;
    receiver_full_name: string;
    transaction_description: string;
    transaction_amount: number;
    transaction_type: string;
    transaction_date: Date;
    transaction_status: TransactionStatus;
}
export {};
