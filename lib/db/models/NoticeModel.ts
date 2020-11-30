import {Column, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'notices',
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
class NoticeModel extends Model<NoticeModel> {
    @Column({primaryKey: true})
    id: number;

    @Column
    title: string;

    @Column
    body: string;

    @Column
    target_os: string;

    @Column
    target_version: string;
}

export default NoticeModel
