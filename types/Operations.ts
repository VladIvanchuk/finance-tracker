export type OperationType = "income" | "expense";

export type OperationItemType =
  | "category"
  | "currency"
  | "account"
  | "description"
  | "attachment"
  | "repeat";

export interface IOperation {
  value: string;
  category: string;
  description: string;
  accountId: number;
  currency: "USD" | "UAH" | "UAH";
}
export interface OperationItem {
  id: string;
  type: OperationItemType;
  items?: { label: string; value: string }[];
}
