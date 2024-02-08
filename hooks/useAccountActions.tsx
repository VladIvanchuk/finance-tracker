import { useCallback } from "react";
import { BSON } from "realm";
import { useDatabase } from "./useDatabase";
import { IAccount } from "@/types/AccountTypes";
import { Account } from "@/schemas/Account";

export const useAccountActions = () => {
  const { realm } = useDatabase();

  if (!realm) {
    throw new Error(
      "No Realm instance found. Make sure your component is wrapped in a DatabaseProvider."
    );
  }

  const createAccount = useCallback(
    (accountData: IAccount) => {
      realm.write(() => {
        realm.create(Account, accountData);
      });
    },
    [realm]
  );

  const deleteAccount = useCallback((primaryKey: BSON.ObjectId) => {}, [realm]);

  const updateAccount = useCallback(
    (accountData: IAccount, primaryKey: BSON.ObjectId) => {},
    [realm]
  );

  return { createAccount };
};
