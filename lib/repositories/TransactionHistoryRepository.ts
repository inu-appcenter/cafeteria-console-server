import SequelizeCRUDRepository from './base/SequelizeCRUDRepository';
import TransactionHistory from '../entities/TransactionHistory';
import TransactionHistoryModel from '../db/models/TransactionHistoryModel';

class TransactionHistoryRepository extends SequelizeCRUDRepository<
  TransactionHistory,
  TransactionHistoryModel
> {
  constructor() {
    super(TransactionHistory, TransactionHistoryModel);
  }

  async getAllRecentHistories() {
    return await this.readRecent(200);
  }
}

const transactionHistoryRepository = new TransactionHistoryRepository();

export default transactionHistoryRepository;
