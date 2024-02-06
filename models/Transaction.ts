import { BSON, ObjectSchema } from "realm";

export class Transaction extends Realm.Object<Transaction> {
  _id!: BSON.ObjectId;
  name!: string;

  static schema: ObjectSchema = {
    name: "Transaction",
    properties: {
      _id: "objectId",
      name: { type: "string", indexed: "full-text" },
    },
    primaryKey: "_id",
  };
}
