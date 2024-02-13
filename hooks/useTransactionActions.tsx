import { Transaction } from "@/schemas/Transaction";
import { IOperation } from "@/types/OperationTypes";
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
            categoryId: operation.categoryId,
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
    [realm]
  );

  const deleteTransaction = useCallback(
    (primaryKey: BSON.ObjectId) => {
      const toDelete = realm
        .objects(Transaction)
        .filtered("_id == $0", primaryKey);
      realm.write(() => {
        realm.delete(toDelete);
      });
    },
    [realm]
  );

  return { createTransaction, deleteTransaction };
};
