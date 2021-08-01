import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import CafeteriaModel from './CafeteriaModel';

@Table({
  tableName: 'cafeteria_validation_params',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
class CafeteriaValidationParamsModel extends Model<CafeteriaValidationParamsModel> {
  @ForeignKey(() => CafeteriaModel)
  @Column({primaryKey: true})
  cafeteria_id: number;

  @Column
  token: string;

  @Column
  available_meal_types: string;

  @Column
  time_range_breakfast: string;

  @Column
  time_range_lunch: string;

  @Column
  time_range_dinner: string;
}

export default CafeteriaValidationParamsModel;
