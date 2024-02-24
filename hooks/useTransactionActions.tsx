import { Transaction } from "@/schemas/Transaction";
import { ITransaction } from "@/types/TransactionTypes";
import { useQuery } from "@realm/react";
import { ObjectId } from "bson";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { getPrimaryKey } from "@/utils/getPrimaryKey";
import {
  handleIncomeExpenseOperation,
  handleTransferOperation,
} from "@/services/transactionCreateService";

export const useTransactionActions = () => {
  const { realm } = useDatabase();

  const getTransactions = useCallback((): Transaction[] | [] => {
    const transactionsResults = useQuery(Transaction);
    return Array.from(transactionsResults);
  }, [realm]);

  const createTransaction = useCallback(
    (operation: ITransaction) => {
      realm.write(() => {
        switch (operation.type) {
          case "income":
          case "expense":
            handleIncomeExpenseOperation(realm, operation);
            break;
          case "transfer":
            handleTransferOperation(realm, operation);
            break;
          default:
            throw new Error("Invalid operation type");
        }
      });
    },
    [realm]
  );

  const editTransaction = useCallback(
    (updatedOperation: ITransaction) => {
      deleteTransaction(updatedOperation._id);
      realm.write(() => {
        switch (updatedOperation.type) {
          case "income":
          case "expense":
            handleIncomeExpenseOperation(realm, updatedOperation);
            break;
          case "transfer":
            handleTransferOperation(realm, updatedOperation);
            break;
          default:
            throw new Error("Invalid operation type");
        }
      });
    },
    [realm]
  );

  const deleteTransaction = useCallback(
    (id: string | string[] | ObjectId) => {
      const toDelete = realm
        .objects(Transaction)
        .filtered("_id == $0", getPrimaryKey(id));

      realm.write(() => {
        if (toDelete.length > 0) {
          const transaction = toDelete[0];

          if (transaction.type === "income" || transaction.type === "expense") {
            if (transaction.account) {
              if (transaction.type === "income") {
                transaction.account.balance -= transaction.sum;
              } else if (transaction.type === "expense") {
                transaction.account.balance += transaction.sum;
              }
            } else {
              throw new Error("Transaction account not found");
            }
          } else if (transaction.type === "transfer") {
            if (transaction.fromAccount && transaction.toAccount) {
              transaction.fromAccount.balance += transaction.sum;
              transaction.toAccount.balance -= transaction.sum;
            } else {
              throw new Error("Transaction accounts not found");
            }
          }

          realm.delete(toDelete);
        }
      });
    },
    [realm]
  );

  const getTransactionById = useCallback(
    (id: string | string[] | ObjectId): Transaction | null => {
      return realm.objectForPrimaryKey(Transaction, getPrimaryKey(id));
    },
    [realm]
  );

  const getTransactionsByMonth = useCallback(
    (month: number, year: number): Transaction[] | [] => {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);

      const transactionsResults = realm
        .objects(Transaction)
        .filtered("date >= $0 AND date < $1", startOfMonth, endOfMonth);

      return Array.from(transactionsResults);
    },
    [realm]
  );

  return {
    createTransaction,
    editTransaction,
    deleteTransaction,
    getTransactionById,
    getTransactions,
    getTransactionsByMonth,
  };
};
