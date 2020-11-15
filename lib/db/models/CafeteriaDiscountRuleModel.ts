import {Table, Column, Model} from 'sequelize-typescript';

@Table({
    tableName: 'cafeteria_discount_rules',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
class CafeteriaDiscountRuleModel extends Model<CafeteriaDiscountRuleModel> {

    @Column({primaryKey: true})
    id: number;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    enabled: boolean;
}

export default CafeteriaDiscountRuleModel;
