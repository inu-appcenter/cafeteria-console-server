import {Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo} from 'sequelize-typescript';
import Cafeteria from "./Cafeteria";

@Table({
    tableName: 'corner',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
class Corner extends Model<Corner> {

    @Column({primaryKey: true})
    id: number;

    @Column
    name: string;

    @Column
    display_name: string;

    @Column
    available_at: number;

    // @ts-ignore
    @ForeignKey(() => Cafeteria)
    cafeteria_id: number;
}

export default Corner;
