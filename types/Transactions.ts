import { CurrencyType, OperationType } from "./Operations";

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
  id: number;
  date: string;
  type: OperationType;
  sum: number;
  currency: CurrencyType;
  name: string;
  description: string;
  category: string;
  iconName: IconNameType;
  accountName: string;
  attachment: string;
}
