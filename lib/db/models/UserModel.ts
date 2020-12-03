import {Column, Model, Table} from "sequelize-typescript";

@Table({
    tableName: 'users',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
})
class UserModel extends Model<UserModel> {
    @Column({primaryKey: true})
    id: number;

    @Column
    token: string;

    @Column
    barcode: string;

    @Column
    last_login: Date;

    @Column
    last_logout: Date;
}

export default UserModel
