import {Column, Model, Table} from 'sequelize-typescript';

@Table({
  tableName: 'app_version_rules',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
class AppVersionRuleModel extends Model<AppVersionRuleModel> {
  @Column({primaryKey: true})
  id: number;

  @Column
  os: string;

  @Column
  required_minimum_version: string;
}

export default AppVersionRuleModel;
