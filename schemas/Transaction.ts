import { CurrencyType, TransactionType } from "@/types/TransactionTypes";
import Realm, { BSON, ObjectSchema } from "realm";
import { Account } from "./Account";
import { Category } from "./Category";

export class Transaction extends Realm.Object<Transaction> {
  _id!: BSON.ObjectId;
  owner_id!: string;
  type!: TransactionType;
  sum!: number;
  currency!: CurrencyType;
  description?: string;
  attachment?: string;
  date!: Date;
  category?: Category;
  account?: Account;
  fromAccount?: Account;
  toAccount?: Account;

  static schema: ObjectSchema = {
    name: "Transaction",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      owner_id: "string",
      type: "string",
      sum: "double",
      currency: "string",
      description: "string?",
      attachment: "string?",
      date: "date",
      category: "Category?",
      account: "Account?",
      fromAccount: "Account?",
      toAccount: "Account?",
    },
  };
}
