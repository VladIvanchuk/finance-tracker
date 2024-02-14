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
      "No Realm instance found. Make sure your component is wrapped in a DatabaseProvider.",
    );
  }

  const getTransactions = useCallback((): Transaction[] | [] => {
    const transactionsResults = useQuery(Transaction);
    return Array.from(transactionsResults);
  }, [realm]);

  const createTransaction = useCallback(
    (operation: ITransaction) => {
      console.log(operation);

      realm.write(() => {
        let transactionData: Partial<Transaction>;

        if (operation.type === "income" || operation.type === "expense") {
          const accountId = new BSON.ObjectId(operation.accountId);
          const account = realm.objectForPrimaryKey<Account>(
            "Account",
            accountId,
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
            transactionData as Partial<Transaction>,
          );
          account.transactions.push(transaction);
        } else if (operation.type === "transfer") {
          const fromAccountId = new BSON.ObjectId(operation.fromAccountId);
          const toAccountId = new BSON.ObjectId(operation.toAccountId);
          const fromAccount = realm.objectForPrimaryKey<Account>(
            "Account",
            fromAccountId,
          );
          const toAccount = realm.objectForPrimaryKey<Account>(
            "Account",
            toAccountId,
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
            transactionData as Partial<Transaction>,
          );
          fromAccount.transactions.push(transaction);
          toAccount.transactions.push(transaction);
        } else {
          throw new Error("Invalid operation type");
        }
      });
    },
    [realm],
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
    [realm],
  );

  const getTransactionById = useCallback(
    (id: string | string[] | ObjectId): Transaction | null => {
      const primaryKey = Array.isArray(id)
        ? new ObjectId(id[0])
        : new ObjectId(id);
      return realm.objectForPrimaryKey(Transaction, primaryKey);
    },
    [realm],
  );

  return {
    createTransaction,
    deleteTransaction,
    getTransactionById,
    getTransactions,
  };
};
