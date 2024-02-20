import { Account } from "@/schemas/Account";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { ObjectId } from "bson";
import { IAccount } from "@/types/AccountTypes";
import { Transaction } from "@/schemas/Transaction";

export const useAccountActions = () => {
  const { realm } = useDatabase();

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

  const getTotalBalanceByMonth = useCallback(
    (month: number, year: number) => {
      let totalBalance = 0;

      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);

      const accounts = realm.objects<Account>("Account");

      accounts.forEach((account) => {
        // Consider the initial balance of the account at the start of the month
        if (account.createdAt < startOfMonth) {
          totalBalance += account.balance;
        }

        const transactions = account.transactions.filtered(
          "date >= $0 AND date <= $1",
          startOfMonth,
          endOfMonth
        );
        transactions.forEach((transaction) => {
          totalBalance += transaction.sum;
        });
      });

      return totalBalance.toFixed(2);
    },
    [realm]
  );

  const getTotalIncomeByMonth = useCallback(
    (month: number, year: number) => {
      let totalIncome = 0;

      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);

      const transactions = realm
        .objects<Transaction>("Transaction")
        .filtered(
          "date >= $0 AND date < $1 AND type = 'income'",
          startOfMonth,
          endOfMonth
        );

      transactions.forEach((transaction) => {
        totalIncome += transaction.sum;
      });

      return totalIncome.toFixed(2);
    },
    [realm]
  );

  const getTotalExpenseByMonth = useCallback(
    (month: number, year: number) => {
      let totalExpense = 0;

      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);

      const transactions = realm
        .objects<Transaction>("Transaction")
        .filtered(
          "date >= $0 AND date < $1 AND type = 'expense'",
          startOfMonth,
          endOfMonth
        );

      transactions.forEach((transaction) => {
        totalExpense += transaction.sum;
      });

      return totalExpense.toFixed(2);
    },
    [realm]
  );

  return {
    createAccount,
    getAccountById,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
    getTotalBalanceByMonth,
    getTotalIncomeByMonth,
    getTotalExpenseByMonth,
  };
};
