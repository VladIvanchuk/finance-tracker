import "react-native-get-random-values";
import { BSON } from "realm";
import { TransactionType } from "./TransactionTypes";

export interface ICategory {
  _id: BSON.ObjectId;
  owner_id: string;
  name: string;
  type: TransactionType;
  iconKey: string;
}
