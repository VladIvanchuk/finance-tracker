import { Account } from "@/schemas/Account";
import { IAccount } from "@/types/AccountTypes";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { useObject } from "@realm/react";
import { ObjectId } from "bson";

export const useAccountActions = () => {
  const { realm } = useDatabase();

  if (!realm) {
    throw new Error(
      "No Realm instance found. Make sure your component is wrapped in a DatabaseProvider.",
    );
  }

  const createAccount = useCallback(
    (accountData: IAccount) => {
      realm.write(() => {
        realm.create(Account, accountData);
      });
    },
    [realm],
  );

  const getAccountById = useCallback(
    (id: string | ObjectId): IAccount | null => {
      const primaryKey = Array.isArray(id)
        ? new ObjectId(id[0])
        : new ObjectId(id);
      return useObject(Account, primaryKey);
    },
    [realm],
  );

  return { createAccount, getAccountById };
};
