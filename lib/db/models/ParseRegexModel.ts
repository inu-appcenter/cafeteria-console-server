import {Column, Model, Table} from 'sequelize-typescript';

@Table({
  tableName: 'parse_regexes',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
class ParseRegexModel extends Model<ParseRegexModel> {
  @Column({primaryKey: true})
  id: number;

  @Column
  regex: string;
}

export default ParseRegexModel;
