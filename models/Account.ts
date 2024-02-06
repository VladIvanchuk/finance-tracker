import { AccountType } from "@/types/Accounts";
import { CurrencyType } from "@/types/Operations";
import { ITransaction } from "@/types/Transactions";
import { BSON, ObjectSchema } from "realm";

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
      type: "string", // Змініть на відповідний тип для AccountType
      balance: "double",
      currency: "string", // Змініть на відповідний тип для CurrencyType
      transactions: "Transaction[]", // Зв'язок з транзакціями
      bankName: "string?",
      accountNumber: "int?",
      notes: "string?",
    },
    primaryKey: "_id",
  };
}
