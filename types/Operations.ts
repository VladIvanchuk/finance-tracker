export type OperationType = "income" | "expense" | "transfer";

export type CurrencyType = "USD" | "EUR" | "UAH";

export interface BaseOperation {
  type: OperationType;
  sum: string;
  description?: string;
  currency: CurrencyType;
  attachment: string;
}

export interface IncomeExpenseOperation extends BaseOperation {
  type: "income" | "expense";
  category: string;
  accountId: number;
}

export interface TransferOperation extends BaseOperation {
  type: "transfer";
  fromAccountId: number;
  toAccountId: number;
}

export type IOperation = IncomeExpenseOperation | TransferOperation;

export type OperationItemType =
  | "category"
  | "currency"
  | "account"
  | "description"
  | "attachment"
  | "fromAccountId"
  | "toAccountId"
  | "transferAccounts";

export interface OperationItem {
  id: string;
  type: OperationItemType;
  items?: { label: string; value: string }[];
}
