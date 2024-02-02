import { CurrencyType, OperationType } from "./Operations";

export interface ITransaction {
  id: number;
  date: string;
  type: OperationType;
  sum: 120.23;
  currency: CurrencyType;
  name: string;
  description: string;
  category: string;
  accountName: string;
}
