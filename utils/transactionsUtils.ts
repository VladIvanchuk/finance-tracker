import { Transaction } from "@/schemas/Transaction";

type TransactionGroups = {
  [key: string]: Transaction[];
};

export const groupTransactionsByDate = (
  transactions: Transaction[]
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
