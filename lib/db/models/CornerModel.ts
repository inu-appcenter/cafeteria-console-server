import {Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import CafeteriaModel from "./CafeteriaModel";

@Table({
    tableName: 'corners',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
class CornerModel extends Model<CornerModel> {

    @Column({primaryKey: true})
    id: number;

    @Column
    name: string;

    @Column
    display_name: string;

    @Column
    available_at: number;

    // @ts-ignore
    @ForeignKey(() => CafeteriaModel)
    @Column
    cafeteria_id: number;
}

export default CornerModel;
