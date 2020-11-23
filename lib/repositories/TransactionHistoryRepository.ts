import SequelizeCRUDRepository from "./base/SequelizeCRUDRepository";
import TransactionHistory from "../entities/TransactionHistory";
import TransactionHistoryModel from "../db/models/TransactionHistoryModel";

class TransactionHistoryRepository extends SequelizeCRUDRepository<TransactionHistory, TransactionHistoryModel> {

    constructor() {
        super(TransactionHistory, TransactionHistoryModel);
    }

    async getAllHistories() {
        return await this.readAll();
    }
}

const transactionHistoryRepository = new TransactionHistoryRepository();

export default transactionHistoryRepository
