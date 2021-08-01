import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import UserModel from './UserModel';

@Table({
  tableName: 'questions',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
class QuestionModel extends Model<QuestionModel> {
  @Column({primaryKey: true})
  id: number;

  @Column
  device_info: string;

  @Column
  version: string;

  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => UserModel)
  @Column
  user_id: number;
}

export default QuestionModel;
