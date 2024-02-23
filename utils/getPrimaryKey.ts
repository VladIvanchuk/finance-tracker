import { ObjectId } from "bson";

export const getPrimaryKey = (id: string | string[] | ObjectId) => {
  return Array.isArray(id) ? new ObjectId(id[0]) : new ObjectId(id);
};
