import { Account } from "@/schemas/Account";
import { Transaction } from "@/schemas/Transaction";
import { ITransaction } from "@/types/TransactionTypes";
import { useQuery } from "@realm/react";
import { ObjectId } from "bson";
import { useCallback } from "react";
import "react-native-get-random-values";
import { BSON } from "realm";
import { useDatabase } from "./useDatabase";

export const useTransactionActions = () => {
  const { realm } = useDatabase();

  const getTransactions = useCallback((): Transaction[] | [] => {
    const transactionsResults = useQuery(Transaction);
    return Array.from(transactionsResults);
  }, [realm]);

  const createTransaction = useCallback(
    (operation: ITransaction) => {
      realm.write(() => {
        let transactionData: Partial<Transaction>;

        if (operation.type === "income" || operation.type === "expense") {
          const accountId = new BSON.ObjectId(operation.accountId);
          const account = realm.objectForPrimaryKey<Account>(
            "Account",
            accountId
          );
          if (!account) {
            throw new Error("Account not found");
          }

          transactionData = {
            ...operation,
            account: account ? account : undefined,
            categoryId: operation.categoryId
              ? new BSON.ObjectId(operation.categoryId)
              : undefined,
          };

          const transaction = realm.create(
            "Transaction",
            transactionData as Partial<Transaction>
          );
          account.transactions.push(transaction);
          if (operation.type === "income") {
            account.balance += operation.sum;
          } else if (operation.type === "expense") {
            account.balance -= operation.sum;
          }
        } else if (operation.type === "transfer") {
          const fromAccountId = new BSON.ObjectId(operation.fromAccountId);
          const toAccountId = new BSON.ObjectId(operation.toAccountId);
          const fromAccount = realm.objectForPrimaryKey<Account>(
            "Account",
            fromAccountId
          );
          const toAccount = realm.objectForPrimaryKey<Account>(
            "Account",
            toAccountId
          );

          if (!fromAccount || !toAccount) {
            throw new Error("FromAccount or ToAccount not found");
          }

          transactionData = {
            ...operation,
            fromAccount: fromAccount ? fromAccount : undefined,
            toAccount: toAccount ? toAccount : undefined,
          };

          const transaction = realm.create(
            "Transaction",
            transactionData as Partial<Transaction>
          );
          fromAccount.transactions.push(transaction);
          toAccount.transactions.push(transaction);
          if (fromAccount.balance < operation.sum) {
            throw new Error("Insufficient balance in FromAccount");
          }
          fromAccount.balance -= operation.sum;
          toAccount.balance += operation.sum;
        } else {
          throw new Error("Invalid operation type");
        }
      });
    },
    [realm]
  );

  const deleteTransaction = useCallback(
    (id: string | string[] | ObjectId) => {
      const primaryKey = Array.isArray(id)
        ? new ObjectId(id[0])
        : new ObjectId(id);
      const toDelete = realm
        .objects(Transaction)
        .filtered("_id == $0", primaryKey);

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
      const primaryKey = Array.isArray(id)
        ? new ObjectId(id[0])
        : new ObjectId(id);
      return realm.objectForPrimaryKey(Transaction, primaryKey);
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
    deleteTransaction,
    getTransactionById,
    getTransactions,
    getTransactionsByMonth,
  };
};
