import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'notices',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
})
class NoticeModel extends Model<NoticeModel> {
    @Column({primaryKey: true})
    id: number;

    @Column
    title: string;

    @Column(DataType.TEXT)
    body: string;

    @Column
    target_os: string;

    @Column
    target_version: string;
}

export default NoticeModel
