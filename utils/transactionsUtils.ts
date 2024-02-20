import { ITransaction } from "@/types/TransactionTypes";

type TransactionGroups = {
  [key: string]: ITransaction[];
};

export const groupTransactionsByDate = (
  transactions: ITransaction[]
): TransactionGroups => {
  return transactions.reduce((groups: TransactionGroups, transaction) => {
    const dateKey = transaction.date.toISOString().split("T")[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {} as TransactionGroups);
};
