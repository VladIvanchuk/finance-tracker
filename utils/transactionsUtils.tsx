import { ITransaction } from "@/types/Transactions";

type TransactionGroups = {
  [key: string]: ITransaction[];
};

export const groupTransactionsByDate = (
  transactions: ITransaction[],
): TransactionGroups => {
  return transactions.reduce((groups: TransactionGroups, transaction) => {
    const { date } = transaction;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as TransactionGroups);
};
