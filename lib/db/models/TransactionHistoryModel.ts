import {Column, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'transaction_histories',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
class TransactionHistoryModel extends Model<TransactionHistoryModel> {
    @Column({primaryKey: true})
    id: number;

    @Column
    type: string;

    @Column
    user_id: number;

    @Column
    cafeteria_id: number;

    @Column
    meal_type: number;

    @Column
    failed_at: number;

    @Column
    message: string;

    @Column
    timestamp: Date;
}

export default TransactionHistoryModel;
