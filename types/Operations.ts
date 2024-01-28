export interface OperationType {
  value: string;
  category: string;
  description: string;
  accountId: number;
  currency: "USD" | "UAH" | "EUR";
  repeat: boolean;
}
