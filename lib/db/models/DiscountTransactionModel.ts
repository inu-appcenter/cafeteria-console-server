import {Column, Model, Table} from 'sequelize-typescript';

@Table({
  tableName: 'discount_transactions',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
class DiscountTransactionModel extends Model<DiscountTransactionModel> {
  @Column({primaryKey: true})
  id: number;

  @Column
  user_id: number;

  @Column
  cafeteria_id: number;

  @Column
  meal_type: number;

  @Column
  timestamp: Date;
}

export default DiscountTransactionModel;
