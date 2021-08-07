import transactionHistoryRepository from '../core/repositories/TransactionHistoryRepository';

export async function allTransactionHistories() {
  const all = await transactionHistoryRepository.getAllRecentHistories();

  return all.map((history) => history.serialize());
}
