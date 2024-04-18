import { useCategoryActions } from "@/hooks/useCategoryActions";
import { TransactionType } from "@/types/TransactionTypes";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CategoryItem from "../Statistics/CategoryItem";
import ThemedText from "../ui/ThemedText";

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
      ListEmptyComponent={<ThemedText>No categories found.</ThemedText>}
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
