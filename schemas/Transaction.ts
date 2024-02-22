import { CurrencyType, TransactionType } from "@/types/TransactionTypes";
import Realm, { BSON, ObjectSchema } from "realm";
import { Account } from "./Account";

export class Transaction extends Realm.Object<Transaction> {
  _id!: BSON.ObjectId;
  type!: TransactionType;
  sum!: number;
  currency!: CurrencyType;
  description?: string;
  attachment?: string;
  date!: Date;
  categoryId?: BSON.ObjectId;
  account?: Account;
  fromAccount?: Account;
  toAccount?: Account;

  static schema: ObjectSchema = {
    name: "Transaction",
    properties: {
      _id: "objectId",
      type: "string",
      sum: "double",
      currency: "string",
      description: "string?",
      attachment: "string?",
      date: "date",
      categoryId: "objectId?",
      account: "Account?",
      fromAccount: "Account?",
      toAccount: "Account?",
    },
    primaryKey: "_id",
  };
}
