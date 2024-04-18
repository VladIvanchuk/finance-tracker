import { Account } from "@/schemas/Account";
import { Category } from "@/schemas/Category";
import { ObjectId } from "bson";
import "react-native-get-random-values";
import { BSON } from "realm";

export type IconNameType =
  | "shopping"
  | "food"
  | "cash"
  | "money-bill-transfer"
  | "piggy-bank"
  | "subscriptions"
  | "car"
  | "gift"
  | "sack"
  | "house"
  | "house-signal"
  | "heart"
  | "masks-theater"
  | "sack-dollar"
  | "school"
  | "donate";

export interface ITransaction {
  _id: BSON.ObjectId;
  owner_id: string;
  type: TransactionType;
  sum: number;
  currency: CurrencyType;
  description?: string;
  attachment?: string;
  date: Date;
  categoryId?: BSON.ObjectId;
  accountId?: BSON.ObjectId;
  fromAccountId?: BSON.ObjectId;
  toAccountId?: BSON.ObjectId;
}

export interface TransactionData {
  _id: BSON.ObjectId;
  owner_id: string;
  type: TransactionType;
  sum: number;
  currency: CurrencyType;
  description?: string;
  attachment?: string;
  date: Date;
  category?: Category;
  account?: Account;
  fromAccount?: Account;
  toAccount?: Account;
}

export type TransactionType = "income" | "expense" | "transfer";

export type CurrencyType = "USD" | "EUR" | "UAH";

export interface BaseTransaction {
  _id: BSON.ObjectId;
  owner_id: string;
  type: TransactionType;
  sum: number;
  currency: CurrencyType;
  description?: string;
  attachment?: string;
  date: string;
}

export interface IncomeExpenseTransaction extends BaseTransaction {
  type: "income" | "expense";
  categoryId: BSON.ObjectId | null;
  account: BSON.ObjectId | null;
}

export interface TransferTransaction extends BaseTransaction {
  type: "transfer";
  fromAccountId: BSON.ObjectId | null;
  toAccountId: BSON.ObjectId | null;
}

export type TransactionItemType =
  | "categoryId"
  | "currency"
  | "account"
  | "description"
  | "attachment"
  | "fromAccountId"
  | "toAccountId"
  | "transferAccounts"
  | "date";

export interface TransactionItem {
  id: string;
  type: TransactionItemType;
  items?: { label: string; value: string | ObjectId }[];
}
