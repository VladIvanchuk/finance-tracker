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

interface StatsListProps {
  transactions: Realm.Results<Transaction> | null;
}

const StatsList = ({ transactions }: StatsListProps) => {
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
        {selectedFilter === "Transactions" &&
          sortedTransactions?.map((transaction) => (
            <TransactionItem
              key={transaction._id.toString()}
              {...transaction}
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
