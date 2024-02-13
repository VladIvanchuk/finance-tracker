import { CurrencyType, OperationType } from "@/types/OperationTypes";
import Realm, { BSON, ObjectSchema } from "realm";

export class Transaction extends Realm.Object<Transaction> {
  _id!: BSON.ObjectId;
  type!: OperationType;
  sum!: number;
  currency!: CurrencyType;
  description?: string;
  attachment?: string;
  date!: string;
  categoryId?: BSON.ObjectId;
  accountId?: BSON.ObjectId;
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
      accountId: "objectId?",
      fromAccountId: "objectId?",
      toAccountId: "objectId?",
    },
    primaryKey: "_id",
  };
}
