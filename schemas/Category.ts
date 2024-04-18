import { TransactionType } from "@/types/TransactionTypes";
import Realm, { BSON, ObjectSchema } from "realm";

export class Category extends Realm.Object<Category> {
  _id!: BSON.ObjectId;
  owner_id!: string;
  name!: string;
  type!: TransactionType;
  iconKey!: string;

  static schema: ObjectSchema = {
    name: "Category",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      owner_id: "string",
      name: "string",
      type: "string",
      iconKey: "string",
    },
  };
}
