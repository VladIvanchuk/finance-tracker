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
import useCurrencies from "./useCurrencies";
import { baseCurrency } from "@/data/baseCurrency";
import { TransactionType } from "@/types/TransactionTypes";

interface CategorySum {
  category: Category;
  sum: number;
}

interface CategorySums {
  [key: string]: CategorySum;
}

export const useStatisticsAction = () => {
  const { realm } = useDatabase();

  const { convertToBaseCurrency } = useCurrencies();

  const convertCurrency = useCallback(
    async (amount: number, account?: Account) => {
      if (account && account.currency !== baseCurrency) {
        const convertedAmount = await convertToBaseCurrency(
          amount,
          account.currency,
        );
        return convertedAmount ? convertedAmount : 0;
      }
      return amount;
    },
    [convertToBaseCurrency, baseCurrency],
  );

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
  const getCategoriesAmountsByPeriodAndType = useCallback(
    async (
      period: string,
      type: StatisticType,
    ): Promise<Array<{ category: Category; sum: number }> | null> => {
      const transactions = getTransactionsByPeriodAndType(period, type);
      if (!transactions || transactions.length === 0) return null;

      const convertedTransactions = await Promise.all(
        transactions.map(async (transaction) => ({
          ...transaction,
          sum: await convertCurrency(transaction.sum, transaction.account),
        })),
      );

      const categorySums = convertedTransactions.reduce<CategorySums>(
        (acc, transaction) => {
          if (transaction.category) {
            const categoryId = transaction.category._id.toString();
            if (!acc[categoryId]) {
              acc[categoryId] = { category: transaction.category, sum: 0 };
            }
            acc[categoryId].sum += transaction.sum;
          }
          return acc;
        },
        {},
      );

      const result = Object.values(categorySums).map((entry) => ({
        category: entry.category,
        sum: entry.sum,
      }));

      return result;
    },
    [getTransactionsByPeriodAndType, convertCurrency],
  );

  const getChartData = useCallback(
    async (period: Period, type: StatisticType): Promise<ChartData | null> => {
      const transactions = getTransactionsByPeriodAndType(period, type);
      if (!transactions || transactions.length === 0) return null;

      const convertedTransactions = await Promise.all(
        transactions.map(async (transaction) => ({
          ...transaction,
          sum: await convertCurrency(transaction.sum, transaction.account),
        })),
      );

      const earliestTransactionDate = convertedTransactions.reduce(
        (earliest, transaction) =>
          transaction.date < earliest ? transaction.date : earliest,
        convertedTransactions[0].date,
      );

      const startDate = getStartDateForPeriod(
        period,
        period === "All" ? earliestTransactionDate : undefined,
      );
      const endDate = new Date();

      let labels: string[] = [];
      let groupedData: GroupedData = {};

      if (period === "1W") {
        groupedData = handleTransactionsForWeek(
          convertedTransactions as Transaction[],
          period,
        );
        labels = daysOfWeek;
      } else {
        const totalDays = calculateTotalDays(startDate, endDate);
        [labels, groupedData] = initializeGroupedDataForOtherPeriods(
          startDate,
          totalDays,
          period,
        );
        groupedData = handleTransactionsForOtherPeriods(
          convertedTransactions as Transaction[],
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

  const getTotalBalance = useCallback(async () => {
    const accounts = realm
      .objects<Account>("Account")
      .filtered("disregard != true");
    let totalBalance = 0;
    for (const account of accounts) {
      totalBalance += await convertCurrency(account.balance, account);
    }
    return totalBalance.toFixed(2);
  }, [realm, convertCurrency]);

  const getMonthlyTransactions = useCallback(
    (type: TransactionType, month: number, year: number) => {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);
      return realm
        .objects<Transaction>("Transaction")
        .filtered(
          "type = $0 AND date >= $1 AND date <= $2 AND account.disregard != true",
          type,
          startOfMonth,
          endOfMonth,
        );
    },
    [realm],
  );

  const getTotalIncomeByMonth = useCallback(
    async (month: number, year: number) => {
      let totalIncome = 0;
      const transactions = getMonthlyTransactions("income", month, year);
      for (const transaction of transactions) {
        totalIncome += await convertCurrency(
          transaction.sum,
          transaction.account,
        );
      }
      return totalIncome.toFixed(2);
    },
    [getMonthlyTransactions, convertCurrency],
  );

  const getTotalExpenseByMonth = useCallback(
    async (month: number, year: number) => {
      let totalExpense = 0;
      const transactions = getMonthlyTransactions("expense", month, year);
      for (const transaction of transactions) {
        totalExpense += await convertCurrency(
          transaction.sum,
          transaction.account,
        );
      }
      return totalExpense.toFixed(2);
    },
    [getMonthlyTransactions, convertCurrency],
  );

  return {
    getTransactionsByPeriodAndType,
    getCategoriesAmountsByPeriodAndType,
    getChartData,
    getTotalBalance,
    getTotalIncomeByMonth,
    getTotalExpenseByMonth,
  };
};
