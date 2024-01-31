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
  type:
    | "category"
    | "currency"
    | "account"
    | "description"
    | "attachment"
    | "repeat";
  items?: { label: string; value: string }[];
}
