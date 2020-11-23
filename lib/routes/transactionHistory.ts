import transactionHistoryRepository from "../repositories/TransactionHistoryRepository";

export async function allTransactionHistories() {
    const all = await transactionHistoryRepository.getAllHistories();

    return all.map((history) => history.serialize());
}
