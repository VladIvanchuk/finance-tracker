import { Transaction } from "@/schemas/Transaction";
import { IOperation } from "@/types/OperationTypes";
import { useCallback } from "react";
import "react-native-get-random-values";
import { BSON } from "realm";
import { useDatabase } from "./useDatabase";
import { ObjectId } from "bson";
import { ITransaction } from "@/types/TransactionTypes";
import { useObject, useQuery } from "@realm/react";

export const useTransactionActions = () => {
  const { realm } = useDatabase();

  if (!realm) {
    throw new Error(
      "No Realm instance found. Make sure your component is wrapped in a DatabaseProvider.",
    );
  }

  const getTransactions = useCallback((): ITransaction[] | [] => {
    const transactionsResults = useQuery(Transaction);
    return Array.from(transactionsResults);
  }, [realm]);

  const createTransaction = useCallback(
    (operation: IOperation) => {
      realm.write(() => {
        let operationToCreate: Partial<Transaction>;

        if (operation.type === "income" || operation.type === "expense") {
          operationToCreate = {
            ...operation,
            accountId: operation.accountId
              ? new BSON.ObjectId(operation.accountId)
              : undefined,
            categoryId: operation.categoryId
              ? new BSON.ObjectId(operation.categoryId)
              : undefined,
          };
        } else if (operation.type === "transfer") {
          operationToCreate = {
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

        realm.create("Transaction", operationToCreate as Partial<Transaction>);
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
    (id: string | string[] | ObjectId): ITransaction | null => {
      const primaryKey = Array.isArray(id)
        ? new ObjectId(id[0])
        : new ObjectId(id);
      return useObject(Transaction, primaryKey);
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
