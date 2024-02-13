import "react-native-get-random-values";
import { BSON } from "realm";
import { CurrencyType, OperationType } from "./OperationTypes";
import { Account } from "@/schemas/Account";

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
  type: OperationType;
  sum: number;
  currency: CurrencyType;
  description?: string;
  attachment?: string;
  date: string;
  categoryId?: BSON.ObjectId;
  accountId?: BSON.ObjectId;
  fromAccountId?: BSON.ObjectId;
  toAccountId?: BSON.ObjectId;
}

export interface TransactionData {
  _id: BSON.ObjectId;
  type: OperationType;
  sum: number;
  currency: CurrencyType;
  description?: string;
  attachment?: string;
  date: string;
  categoryId?: BSON.ObjectId;
  account?: Account;
  fromAccountId?: BSON.ObjectId;
  toAccountId?: BSON.ObjectId;
}
