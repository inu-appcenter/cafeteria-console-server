import {Table, Column, Model, PrimaryKey} from 'sequelize-typescript';

@Table({
    tableName: 'cafeteria',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
class CafeteriaModel extends Model<CafeteriaModel> {

    @Column({primaryKey: true})
    id: number;

    @Column
    name: string;

    @Column
    display_name: string;

    @Column
    image_path: string;

    @Column
    support_menu: boolean;

    @Column
    support_discount: boolean;

    @Column
    support_notification: boolean;
}

export default CafeteriaModel;
