import { BSON } from "realm";
import { CurrencyType } from "./Operations";
import { ITransaction } from "./Transactions";

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
  accountNumber?: number;
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
