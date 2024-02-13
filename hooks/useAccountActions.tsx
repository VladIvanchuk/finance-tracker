import { Account } from "@/schemas/Account";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { ObjectId } from "bson";
import { IAccount } from "@/types/AccountTypes";

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
        realm.create<Account>("Account", accountData);
      });
    },
    [realm],
  );

  const getAccountById = useCallback(
    (id: string | ObjectId): Account | null => {
      return realm.objectForPrimaryKey(Account, id);
    },
    [realm],
  );

  return { createAccount, getAccountById };
};
