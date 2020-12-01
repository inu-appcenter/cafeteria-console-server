import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import CafeteriaModel from "./CafeteriaModel";
import UserModel from "./UserModel";

@Table({
    tableName: 'questions',
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
})
class QuestionModel extends Model<QuestionModel> {
    @Column({primaryKey: true})
    id: number;

    @Column
    device_info: string;

    @Column
    version: string;

    @Column
    content: string;

    @ForeignKey(() => UserModel)
    @Column
    user_id: number;
}

export default QuestionModel;
