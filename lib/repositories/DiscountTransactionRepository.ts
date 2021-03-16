import SequelizeCRUDRepository from "./base/SequelizeCRUDRepository";
import DiscountTransaction from "../entities/DiscountTransaction";
import DiscountTransactionModel from "../db/models/DiscountTransactionModel";
import {Op} from "sequelize";
import {endOfTheDay, startOfTheDay} from "../utils/date";
import {assignIfValid} from "../utils/object";
import logger from "../utils/logger";

type TransactionQueryOptions = {
    cafeteriaId?: number,
    date?: Date
};

/**
 * DiscountTransaction은 commit이 완료된 할인 기록입니다 (TransactionHistory와 다름).
 * 이 Repository는 DiscountTransaction에 대한 저장소입니다.
 */
class DiscountTransactionRepository extends SequelizeCRUDRepository<DiscountTransaction, DiscountTransactionModel> {

    constructor() {
        super(DiscountTransaction, DiscountTransactionModel);
    }

    /**
     * 주어진 식당 코드와 날짜에 맞는 할인 기록을 모두 가져옵니다.
     * @param options
     */
    async getTransactions(options: TransactionQueryOptions): Promise<DiscountTransaction[]>{
        return await this.readAll({
            where: this.getFindOptions(options)
        });
    }

    private getFindOptions(options: TransactionQueryOptions) {
        const whereClause = {};

        assignIfValid(whereClause, 'cafeteria_id', options.cafeteriaId, (v) => v !== undefined && !isNaN(v));
        assignIfValid(whereClause, 'timestamp', this.getSameDayWhereClause(options.date), (v) => !!v);

        return whereClause;
    }

    private getSameDayWhereClause(date?: Date) {
        if (!date) {
            throw new Error("이 인자는 undefined이면 안돼요!!!!!!");
        }

        return {
            [Op.gte]: startOfTheDay(date),
            [Op.lte]: endOfTheDay(date)
        };
    }
}

const discountTransactionRepository = new DiscountTransactionRepository();

export default discountTransactionRepository;
