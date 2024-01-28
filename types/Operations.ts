export interface OperationType {
  value: string;
  category: string;
  description: string;
  accountId: number;
  currency: "USD" | "UAH" | "UAH";
  repeat: boolean;
}
export interface OperationItem {
  id: string;
  type: keyof OperationType;
  items: { label: string; value: string }[];
}
