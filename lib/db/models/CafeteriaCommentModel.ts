import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import CafeteriaModel from './CafeteriaModel';

@Table({
  tableName: 'cafeteria_comments',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
class CafeteriaCommentModel extends Model<CafeteriaCommentModel> {
  @ForeignKey(() => CafeteriaModel)
  @Column({primaryKey: true})
  cafeteria_id: number;

  @Column
  comment: string;
}

export default CafeteriaCommentModel;
