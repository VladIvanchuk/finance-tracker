import { useCategoryActions } from "@/hooks/useCategoryActions";
import { TransactionType } from "@/types/TransactionTypes";
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import CategoryItem from "../Statistics/CategoryItem";

interface CategoriesListProps {
  type: TransactionType;
}

const CategoriesList = ({ type }: CategoriesListProps) => {
  const { getCategoriesByType } = useCategoryActions();
  const categories = getCategoriesByType(type);

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryItem key={item._id.toString()} {...item} />
      )}
      keyExtractor={(item) => item._id.toString()}
      ListEmptyComponent={<Text>No categories found.</Text>}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    gap: 10,
    paddingBottom: 20,
  },
});

export default CategoriesList;
