import { AccountType } from "@/types/AccountTypes";
import { CurrencyType } from "@/types/TransactionTypes";
import Realm, { BSON, ObjectSchema } from "realm";
import { Transaction } from "@/schemas/Transaction";

export class Account extends Realm.Object<Account> {
  _id!: BSON.ObjectId;
  owner_id!: string;
  createdAt!: Date;
  name!: string;
  type!: AccountType;
  balance!: number;
  currency!: CurrencyType;
  transactions!: Realm.List<Transaction>; // To-Many relationship to Transaction
  bankName?: string;
  accountNumber?: string;
  notes?: string;
  disregard?: boolean;

  static schema: ObjectSchema = {
    name: "Account",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      owner_id: "string",
      createdAt: "date",
      name: "string",
      type: "string",
      balance: "double",
      currency: "string",
      transactions: "Transaction[]",
      bankName: "string?",
      accountNumber: "string?",
      notes: "string?",
      disregard: "bool?",
    },
  };
}
