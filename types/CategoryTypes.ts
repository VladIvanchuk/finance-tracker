import { BSON } from "realm";
import { OperationType } from "./OperationTypes";

export interface ICategory {
  _id: BSON.ObjectId;
  name: string;
  type: OperationType;
  iconKey: string;
}
