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

  if (!realm) {
    throw new Error(
      "No Realm instance found. Make sure your component is wrapped in a DatabaseProvider."
    );
  }

  const getTransactions = useCallback((): Transaction[] | [] => {
    const transactionsResults = useQuery(Transaction);
    return Array.from(transactionsResults);
  }, [realm]);

  const createTransaction = useCallback(
    (operation: ITransaction) => {
      realm.write(() => {
        const accountId = new BSON.ObjectId(operation.accountId);
        const account = realm.objectForPrimaryKey<Account>(
          "Account",
          accountId
        );

        if (!account) {
          throw new Error(`Account with id ${accountId} not found`);
        }

        let transactionData: Partial<Transaction>;

        if (operation.type === "income" || operation.type === "expense") {
          transactionData = {
            ...operation,
            account: account ? account : undefined,
            categoryId: operation.categoryId
              ? new BSON.ObjectId(operation.categoryId)
              : undefined,
          };
        } else if (operation.type === "transfer") {
          transactionData = {
            ...operation,
            fromAccountId: operation.fromAccountId
              ? new BSON.ObjectId(operation.fromAccountId)
              : undefined,
            toAccountId: operation.toAccountId
              ? new BSON.ObjectId(operation.toAccountId)
              : undefined,
          };
        } else {
          throw new Error("Invalid operation type");
        }

        const transaction = realm.create(
          "Transaction",
          transactionData as Partial<Transaction>
        );
        account.transactions.push(transaction);
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
        realm.delete(toDelete);
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

  return {
    createTransaction,
    deleteTransaction,
    getTransactionById,
    getTransactions,
  };
};
