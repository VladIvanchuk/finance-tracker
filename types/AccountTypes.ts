import "react-native-get-random-values";
import { BSON } from "realm";
import { CurrencyType } from "./OperationTypes";
import { ITransaction } from "./TransactionTypes";
import { Transaction } from "@/schemas/Transaction";

export type AccountType =
  | "Cash"
  | "Debit"
  | "Credit"
  | "Savings"
  | "Investment"
  | "Online Card"
  | string;

export interface IAccount {
  _id: BSON.ObjectId;
  name: string;
  type: AccountType;
  balance: number;
  currency: CurrencyType;
  transactions?: ITransaction[];
  bankName?: string;
  accountNumber?: string;
  notes?: string;
}

export type AccountItemType =
  | "name"
  | "type"
  | "currency"
  | "bankName"
  | "accountNumber"
  | "notes";

export interface AccountItem {
  id: string;
  type: AccountItemType;
  items?: { label: string; value: string }[];
}
export interface AccountData {
  _id: BSON.ObjectId;
  name: string;
  type: AccountType;
  balance: number;
  currency: CurrencyType;
  transactions?: Realm.List<Transaction>;
  bankName?: string;
  accountNumber?: string;
  notes?: string;
}
