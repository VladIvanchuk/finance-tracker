import { defaultCategories } from "@/data/defaultCategories";
import Realm from "realm";

export const initializeDefaultCategories = async (realm: Realm) => {
  if (realm.objects("Category").isEmpty()) {
    realm.write(() => {
      defaultCategories.forEach((categoryData) => {
        realm.create("Category", {
          _id: new Realm.BSON.ObjectId(),
          ...categoryData,
        });
      });
    });
  }
};
