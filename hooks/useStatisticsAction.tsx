import { Transaction } from "@/schemas/Transaction";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { StatisticType } from "@/types/StatisticsTypes";
import { getStartDateForPeriod } from "@/services/transactionCreateService";
import { Account } from "@/schemas/Account";
import { Category } from "@/schemas/Category";

interface CategorySumEntry {
  category: Category;
  sum: number;
}

type AccumulatorType = {
  [categoryId: string]: CategorySumEntry;
};

export const useStatisticsAction = () => {
  const { realm } = useDatabase();

  const getTransactionsByPeriodAndType = useCallback(
    (
      period: string,
      type: StatisticType
    ): Realm.Results<Transaction> | null => {
      const startDate = getStartDateForPeriod(period);
      const endDate = new Date();
      if (period === "All") {
        return realm.objects(Transaction).filtered(`type == "${type}"`);
      } else {
        return realm
          .objects(Transaction)
          .filtered(
            `type == "${type}" AND date >= $0 AND date <= $1`,
            startDate,
            endDate
          );
      }
    },
    [realm]
  );
  const getCategoriesWithAmountsByPeriodAndType = useCallback(
    (
      period: string,
      type: StatisticType
    ): Array<{ category: Category; sum: number }> | null => {
      const transactions = getTransactionsByPeriodAndType(period, type);
      if (!transactions) {
        return null;
      }

      const categorySums = transactions.reduce<AccumulatorType>(
        (acc, transaction) => {
          if (transaction.category) {
            const categoryId = transaction.category._id.toString();
            if (categoryId) {
              if (!acc[categoryId]) {
                acc[categoryId] = { category: transaction.category, sum: 0 };
              }
              acc[categoryId].sum += transaction.sum;
            }
          }
          return acc;
        },
        {}
      );

      // Convert the aggregated object into an array of CategorySumEntry
      const result = Object.keys(categorySums).map((key) => ({
        category: categorySums[key].category,
        sum: categorySums[key].sum,
      }));

      return result;
    },
    [getTransactionsByPeriodAndType]
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
    getTransactionsByPeriodAndType,
    getCategoriesWithAmountsByPeriodAndType,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
    getTotalIncomeByMonth,
    getTotalExpenseByMonth,
  };
};
