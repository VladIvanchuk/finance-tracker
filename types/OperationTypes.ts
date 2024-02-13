import "react-native-get-random-values";
import { BSON } from "realm";
import { ObjectId } from "bson";

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
  categoryId: BSON.ObjectId | null;
  accountId: BSON.ObjectId | null;
}

export interface TransferOperation extends BaseOperation {
  type: "transfer";
  fromAccountId: BSON.ObjectId | null;
  toAccountId: BSON.ObjectId | null;
}

export type IOperation = IncomeExpenseOperation | TransferOperation;

export type OperationItemType =
  | "categoryId"
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
  items?: { label: string; value: string | ObjectId }[];
}
