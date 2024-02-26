import { daysOfWeek } from "@/data/daysOfWeek";
import { Transaction } from "@/schemas/Transaction";
import { GroupedData, Period } from "@/types/StatisticsTypes";
import { formatChartDate } from "@/utils/formatChartDate";

export const calculateTotalDays = (startDate: Date, endDate: Date): number =>
  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

const initializeGroupedDataForWeek = (labels: string[]): GroupedData =>
  labels.reduce<GroupedData>((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

export const handleTransactionsForWeek = (
  transactions: Realm.Results<Transaction>,
  period: Period,
): GroupedData => {
  const groupedData = initializeGroupedDataForWeek(daysOfWeek);
  transactions.forEach((transaction) => {
    const dateKey = formatChartDate(transaction.date, period);
    if (groupedData[dateKey] !== undefined) {
      groupedData[dateKey] = (groupedData[dateKey] as number) + transaction.sum;
    }
  });
  return groupedData;
};

export const initializeGroupedDataForOtherPeriods = (
  startDate: Date,
  totalDays: number,
  period: Period,
): [string[], GroupedData] => {
  const labels: string[] = [];
  const groupedData: GroupedData = {};
  const daysPerInterval = Math.ceil(totalDays / 6);

  for (let i = 0; i < 6; i++) {
    const intervalStartDate = new Date(
      startDate.getTime() + daysPerInterval * i * 1000 * 60 * 60 * 24,
    );
    const label = formatChartDate(intervalStartDate, period);
    labels.push(label);
    groupedData[label] = { sum: 0, count: 0 };
  }

  return [labels, groupedData];
};

export const handleTransactionsForOtherPeriods = (
  transactions: Realm.Results<Transaction>,
  startDate: Date,
  labels: string[],
  groupedData: GroupedData,
  daysPerInterval: number,
): GroupedData => {
  transactions.forEach((transaction) => {
    const intervalIndex = Math.min(
      Math.floor(
        (transaction.date.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24) /
          daysPerInterval,
      ),
      5,
    );
    const intervalLabel = labels[intervalIndex];
    const data = groupedData[intervalLabel] as { sum: number; count: number };
    data.sum += transaction.sum;
    data.count += 1;
  });

  labels.forEach((label) => {
    const data = groupedData[label];
    if (typeof data === "object" && data.count > 0) {
      groupedData[label] = data.sum / data.count;
    } else {
      groupedData[label] = 0;
    }
  });

  return groupedData;
};
