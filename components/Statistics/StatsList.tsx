import {
  categoriesSortItems,
  filterItems,
  transactionsSortItems,
} from "@/data/statsSortItems";
import { Transaction } from "@/schemas/Transaction";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TransactionItem from "../Home/TransactionItem";
import StatsFilter from "./StatsFilter";
import StatsSort from "./StatsSort";
import { Category } from "@/schemas/Category";
import CategoryItem from "./CategoryItem";
import { StatisticType } from "@/types/StatisticsTypes";

interface StatsListProps {
  transactions: Realm.Results<Transaction> | null;
  categories: Array<{ category: Category; sum: number }> | null;
  type: StatisticType;
}

const StatsList = ({ transactions, categories, type }: StatsListProps) => {
  const [selectedFilter, setSelectedFilter] = useState(filterItems[0].value);
  const sortItems =
    selectedFilter === "Categories"
      ? categoriesSortItems
      : transactionsSortItems;
  const [selectedSort, setSelectedSort] = useState(sortItems[0].value);

  useEffect(() => {
    setSelectedSort(sortItems[0].value);
  }, [sortItems]);

  const sortedTransactions = transactions
    ? [...transactions].sort((a, b) => {
        switch (selectedSort) {
          case "new to old":
            return b.date.getTime() - a.date.getTime();
          case "old to new":
            return a.date.getTime() - b.date.getTime();
          case "lowest to highest":
            return a.sum - b.sum;
          case "highest to lowest":
            return b.sum - a.sum;
          default:
            return 0;
        }
      })
    : transactions;

  const sortedCategories = categories
    ? [...categories].sort((a, b) => {
        switch (selectedSort) {
          case "lowest to highest":
            return a.sum - b.sum;
          case "highest to lowest":
            return b.sum - a.sum;
          default:
            return 0;
        }
      })
    : categories;

  return (
    <View style={styles.container}>
      <View style={styles.list_header}>
        <StatsFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <StatsSort
          sortItems={sortItems}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </View>
      <View style={styles.list_container}>
        {selectedFilter === "Transactions"
          ? sortedTransactions?.map((transaction) => (
              <TransactionItem
                key={transaction._id.toString()}
                {...transaction}
              />
            ))
          : sortedCategories?.map((category) => (
              <CategoryItem
                key={category.category._id.toString()}
                {...category}
                type={type}
              />
            ))}
      </View>
    </View>
  );
};

export default StatsList;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  list_header: { flexDirection: "row", justifyContent: "space-between" },
  list_container: {
    gap: 10,
    marginBottom: 120,
  },
});
