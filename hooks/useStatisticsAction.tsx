import { daysOfWeek } from "@/data/daysOfWeek";
import { Account } from "@/schemas/Account";
import { Category } from "@/schemas/Category";
import { Transaction } from "@/schemas/Transaction";
import {
  calculateTotalDays,
  handleTransactionsForOtherPeriods,
  handleTransactionsForWeek,
  initializeGroupedDataForOtherPeriods,
} from "@/services/staristicServices";
import { getStartDateForPeriod } from "@/services/transactionCreateService";
import {
  ChartData,
  GroupedData,
  Period,
  StatisticType,
} from "@/types/StatisticsTypes";
import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";

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
      type: StatisticType,
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
            endDate,
          );
      }
    },
    [realm],
  );
  const getCategoriesWithAmountsByPeriodAndType = useCallback(
    (
      period: string,
      type: StatisticType,
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
        {},
      );

      const result = Object.keys(categorySums).map((key) => ({
        category: categorySums[key].category,
        sum: categorySums[key].sum,
      }));

      return result;
    },
    [getTransactionsByPeriodAndType],
  );

  const getChartData = useCallback(
    (period: Period, type: StatisticType): ChartData | null => {
      const transactions = getTransactionsByPeriodAndType(period, type);
      if (!transactions || transactions.length === 0) return null;

      const earliestTransactionDate = transactions.reduce(
        (earliest, transaction) =>
          transaction.date < earliest ? transaction.date : earliest,
        transactions[0].date,
      );

      const startDate = getStartDateForPeriod(
        period,
        period === "All" ? earliestTransactionDate : undefined,
      );
      const endDate = new Date();

      let labels: string[] = [];
      let groupedData: GroupedData = {};

      if (period === "1W") {
        groupedData = handleTransactionsForWeek(transactions, period);
        labels = daysOfWeek;
      } else {
        const totalDays = calculateTotalDays(startDate, endDate);
        [labels, groupedData] = initializeGroupedDataForOtherPeriods(
          startDate,
          totalDays,
          period,
        );
        groupedData = handleTransactionsForOtherPeriods(
          transactions,
          startDate,
          labels,
          groupedData,
          Math.ceil(totalDays / 6),
        );
      }

      const chartData: ChartData = {
        labels,
        datasets: [
          {
            data: labels.map((label) => {
              const value = groupedData[label];
              return typeof value === "number" ? value : 0;
            }),
          },
        ],
      };

      return chartData;
    },
    [],
  );

  const getTotalBalance = useCallback(() => {
    let totalBalance = 0;

    const accounts = realm
      .objects<Account>("Account")
      .filtered("disregard != true");

    for (const account of accounts) {
      totalBalance += account.balance;
    }

    return totalBalance.toFixed(2);
  }, [realm]);

  const getTotalIncome = useCallback(() => {
    let totalIncome = 0;

    const transactions = realm
      .objects<Transaction>("Transaction")
      .filtered("account.disregard != true AND type = 'income'");

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.sum;
      }
    });

    return totalIncome.toFixed(2);
  }, [realm]);

  const getTotalExpense = useCallback(() => {
    let totalExpense = 0;

    const transactions = realm
      .objects<Transaction>("Transaction")
      .filtered("account.disregard != true AND type = 'expense'");

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
          "account.disregard != true AND type = 'income'",
          "date >= $0 AND date < $1 AND type = 'income'",
          startOfMonth,
          endOfMonth,
        );

      transactions.forEach((transaction) => {
        totalIncome += transaction.sum;
      });

      return totalIncome.toFixed(2);
    },
    [realm],
  );

  const getTotalExpenseByMonth = useCallback(
    (month: number, year: number) => {
      let totalExpense = 0;

      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);

      const transactions = realm
        .objects<Transaction>("Transaction")
        .filtered(
          "account.disregard != true AND type = 'expense'",
          "date >= $0 AND date < $1 AND type = 'expense'",
          startOfMonth,
          endOfMonth,
        );

      transactions.forEach((transaction) => {
        totalExpense += transaction.sum;
      });

      return totalExpense.toFixed(2);
    },
    [realm],
  );

  return {
    getTransactionsByPeriodAndType,
    getCategoriesWithAmountsByPeriodAndType,
    getChartData,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
    getTotalIncomeByMonth,
    getTotalExpenseByMonth,
  };
};
