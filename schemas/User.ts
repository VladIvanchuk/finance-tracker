import { IAccount } from "@/types/AccountTypes";
import { ICategory } from "@/types/CategoryTypes";
import { OperationType } from "@/types/OperationTypes";
import { ITransaction } from "@/types/TransactionTypes";
import Realm, { BSON, ObjectSchema } from "realm";

export class User extends Realm.Object<User> {
  _id!: BSON.ObjectId;
  name!: string;
  accounts!: IAccount[];
  transactions!: ITransaction[];
  categories!: ICategory[];

  static schema: ObjectSchema = {
    name: "User",
    properties: {
      _id: "objectId",
      name: "string",
      accounts: "Account[]",
      transactions: "Transaction[]",
      categories: "Category[]",
    },
    primaryKey: "_id",
  };
}
