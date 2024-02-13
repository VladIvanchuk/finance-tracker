import "react-native-get-random-values";
import { BSON } from "realm";
import { IAccount } from "./AccountTypes";
import { ICategory } from "./CategoryTypes";
import { ITransaction } from "./TransactionTypes";

export interface IUser {
  _id: BSON.ObjectId;
  name: string;
  accounts: IAccount[];
  transactions: ITransaction[];
  categories: ICategory[];
}
