import { useCallback } from "react";
import "react-native-get-random-values";
import { useDatabase } from "./useDatabase";
import { useObject } from "@realm/react";
import { ObjectId } from "bson";
import { Category } from "@/schemas/Category";
import { ICategory } from "@/types/CategoryTypes";
import { getPrimaryKey } from "@/utils/getPrimaryKey";
import { TransactionType } from "@/types/TransactionTypes";

export const useCategoryActions = () => {
  const { realm } = useDatabase();

  if (!realm) {
    throw new Error(
      "No Realm instance found. Make sure your component is wrapped in a DatabaseProvider.",
    );
  }

  const createCategory = useCallback(
    (accountData: ICategory) => {
      realm.write(() => {
        realm.create(Category, accountData);
      });
    },
    [realm],
  );

  const getCategoryById = useCallback(
    (id: string | string[] | ObjectId): ICategory | null => {
      return useObject(Category, getPrimaryKey(id));
    },
    [realm],
  );

  const getCategoriesByType = useCallback(
    (type: TransactionType): ICategory[] => {
      const categories = realm.objects(Category).filtered("type == $0", type);
      return Array.from(categories);
    },
    [realm],
  );

  return { createCategory, getCategoryById, getCategoriesByType };
};
