import { CurrencyType } from "./Operations";
import { ITransaction } from "./Transactions";

export type AccountType =
  | "Cash"
  | "Debit"
  | "Credit"
  | "Savings"
  | "Investment"
  | "Online Card";

export interface IAccount {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  currency: CurrencyType;
  transactions: ITransaction[];
  bankName?: string;
  accountNumber?: number;
  notes?: string;
}
