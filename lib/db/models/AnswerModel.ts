import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import UserModel from "./UserModel";
import QuestionModel from "./QuestionModel";

@Table({
    tableName: 'answers',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
})
class AnswerModel extends Model<AnswerModel> {
    @Column({primaryKey: true})
    id: number;

    @Column
    title: string;

    @Column(DataType.TEXT)
    body: string;

    @Column
    read: boolean;

    @ForeignKey(() => UserModel)
    @Column
    user_id: number;

    @ForeignKey(() => QuestionModel)
    @Column
    question_id: number;
}

export default AnswerModel;
