import { CurrencyType, OperationType } from "@/types/OperationTypes";
import Realm, { BSON, ObjectSchema } from "realm";
import { Account } from "./Account";

export class Transaction extends Realm.Object<Transaction> {
  _id!: BSON.ObjectId;
  type!: OperationType;
  sum!: number;
  currency!: CurrencyType;
  description?: string;
  attachment?: string;
  date!: string;
  categoryId?: BSON.ObjectId;
  account?: Account; // To-One relationship to Account
  fromAccountId?: BSON.ObjectId;
  toAccountId?: BSON.ObjectId;

  static schema: ObjectSchema = {
    name: "Transaction",
    properties: {
      _id: "objectId",
      type: "string",
      sum: "double",
      currency: "string",
      description: "string?",
      attachment: "string?",
      date: "string",
      categoryId: "objectId?",
      account: "Account?", // To-One relationship to Account
      fromAccountId: "objectId?",
      toAccountId: "objectId?",
    },
    primaryKey: "_id",
  };
}
