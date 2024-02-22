import { TransactionType } from "@/types/TransactionTypes";
import Realm, { BSON, ObjectSchema } from "realm";

export class Category extends Realm.Object<Category> {
  _id!: BSON.ObjectId;
  name!: string;
  type!: TransactionType;
  iconKey!: string;

  static schema: ObjectSchema = {
    name: "Category",
    properties: {
      _id: "objectId",
      name: "string",
      type: "string",
      iconKey: "string",
    },
    primaryKey: "_id",
  };
}
