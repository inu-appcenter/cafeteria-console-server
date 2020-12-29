import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import CafeteriaModel from "./CafeteriaModel";

@Table({
    tableName: 'cafeteria_kiosk_numbers',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
})
class CafeteriaKioskNumbersModel extends Model<CafeteriaKioskNumbersModel> {

    @ForeignKey(() => CafeteriaModel)
    @Column({primaryKey: true})
    cafeteriaId: number;

    @Column
    kioskNumbers: string;
}

export default CafeteriaKioskNumbersModel;
