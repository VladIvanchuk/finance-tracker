import { Account } from "@/schemas/Account";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { ObjectId } from "bson";
import { IAccount } from "@/types/AccountTypes";
import { Transaction } from "@/schemas/Transaction";

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
        realm.create<Account>("Account", accountData);
      });
    },
    [realm]
  );

  const getAccountById = useCallback(
    (id: string | ObjectId): Account | null => {
      return realm.objectForPrimaryKey(Account, id);
    },
    [realm]
  );

  const getTotalBalance = useCallback(() => {
    let totalBalance = 0;

    const accounts = realm.objects<Account>("Account");

    for (const account of accounts) {
      totalBalance += account.balance;
    }

    return totalBalance.toFixed(2);
  }, [realm]);

  const getTotalIncome = useCallback(() => {
    let totalIncome = 0;

    const transactions = realm.objects<Transaction>("Transaction");

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.sum;
      }
    });

    return totalIncome.toFixed(2);
  }, [realm]);

  const getTotalExpense = useCallback(() => {
    let totalExpense = 0;

    const transactions = realm.objects<Transaction>("Transaction");

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        totalExpense += transaction.sum;
      }
    });

    return totalExpense.toFixed(2);
  }, [realm]);

  return {
    createAccount,
    getAccountById,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
  };
};
