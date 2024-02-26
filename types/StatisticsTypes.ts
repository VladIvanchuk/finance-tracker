export type StatisticType = "income" | "expense";
export type Period = "All" | "1W" | "1M" | "3M" | "6M" | "1Y";

export interface ChartData {
  labels: string[];
  datasets: Array<{ data: number[] }>;
}
export interface GroupedData {
  [key: string]: number | { sum: number; count: number };
}
