import { transactionsSortItems } from "@/data/statsSortItems";
import { Transaction } from "@/schemas/Transaction";
import { Spinner } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TransactionItem from "../Home/TransactionItem";
import StatsSort from "../Statistics/StatsSort";

interface CategoryStatisticListProps {
  transactions: Realm.Results<Transaction> | null;
  isLoading: boolean;
}

const CategoryStatisticList = ({
  transactions,
  isLoading,
}: CategoryStatisticListProps) => {
  const sortItems = transactionsSortItems;
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

  if (isLoading) {
    return <Spinner size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.list_header}>
        <StatsSort
          sortItems={sortItems}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </View>
      <View style={styles.list_container}>
        {sortedTransactions?.map((transaction) => (
          <TransactionItem
            key={transaction._id.toString()}
            {...transaction}
            useDate
          />
        ))}
      </View>
    </View>
  );
};

export default CategoryStatisticList;

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
