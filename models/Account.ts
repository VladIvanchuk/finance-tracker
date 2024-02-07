import { AccountType } from "@/types/AccountTypes";
import { CurrencyType } from "@/types/OperationTypes";
import { ITransaction } from "@/types/TransactionTypes";
import Realm, { BSON, ObjectSchema } from "realm";

export class Account extends Realm.Object<Account> {
  _id!: BSON.ObjectId;
  name!: string;
  type!: AccountType;
  balance!: number;
  currency!: CurrencyType;
  transactions?: ITransaction[];
  bankName?: string;
  accountNumber?: number;
  notes?: string;

  static schema: ObjectSchema = {
    name: "Account",
    properties: {
      _id: "objectId",
      name: "string",
      type: "string",
      balance: "double",
      currency: "string",
      transactions: "Transaction[]",
      bankName: "string?",
      accountNumber: "int?",
      notes: "string?",
    },
    primaryKey: "_id",
  };
}
