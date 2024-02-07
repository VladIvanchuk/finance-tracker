import { BSON } from "realm";

export type OperationType = "income" | "expense" | "transfer";

export type CurrencyType = "USD" | "EUR" | "UAH";

export interface BaseOperation {
  _id: BSON.ObjectId;
  type: OperationType;
  sum: number;
  currency: CurrencyType;
  description?: string;
  attachment?: string;
  date: string;
}

export interface IncomeExpenseOperation extends BaseOperation {
  type: "income" | "expense";
  category: string;
  accountId: BSON.ObjectId | null;
}

export interface TransferOperation extends BaseOperation {
  type: "transfer";
  fromAccountId: BSON.ObjectId | null;
  toAccountId: BSON.ObjectId | null;
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
