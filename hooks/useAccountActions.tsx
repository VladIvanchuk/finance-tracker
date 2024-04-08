import { Account } from "@/schemas/Account";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { ObjectId } from "bson";
import { IAccount } from "@/types/AccountTypes";
import { Transaction } from "@/schemas/Transaction";
import { getPrimaryKey } from "@/utils/getPrimaryKey";

export const useAccountActions = () => {
  const { realm } = useDatabase();

  const createAccount = useCallback(
    (accountData: IAccount) => {
      realm.write(() => {
        realm.create<Account>("Account", accountData);
      });
    },
    [realm],
  );

  const editAccount = useCallback(
    (accountData: IAccount) => {
      const existingAccount = realm.objectForPrimaryKey(
        Account,
        getPrimaryKey(accountData._id),
      );

      realm.write(() => {
        if (existingAccount) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _id, ...updateData } = accountData;
          Object.assign(existingAccount, updateData);
        }
      });
    },
    [realm],
  );

  const getAccountById = useCallback(
    (id: string | string[] | ObjectId): Account | null => {
      return realm.objectForPrimaryKey(Account, getPrimaryKey(id));
    },
    [realm],
  );

  const deleteAccount = useCallback(
    (id: string | string[] | ObjectId) => {
      const primaryKey = Array.isArray(id)
        ? new ObjectId(id[0])
        : new ObjectId(id);
      const toDelete = realm.objects(Account).filtered("_id == $0", primaryKey);

      realm.write(() => {
        if (toDelete.length > 0) {
          const account = toDelete[0];

          // Delete all transactions associated with this account
          const transactionsToDelete = realm
            .objects(Transaction)
            .filtered("account._id == $0", account._id);
          realm.delete(transactionsToDelete);

          // Delete the account
          realm.delete(account);
        } else {
          throw new Error("Account not found");
        }
      });
    },
    [realm],
  );

  return {
    createAccount,
    editAccount,
    getAccountById,
    deleteAccount,
  };
};
