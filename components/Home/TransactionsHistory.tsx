import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import ThemedText from "../ui/ThemedText";
import TransactionItem from "./TransactionItem";
import { groupTransactionsByDate } from "@/utils/transactionsUtils";
import transactions from "@/mock/transactions.json";
import { ITransaction } from "@/types/Transactions";
import { formatDate } from "@/utils/formatdate";

const TransactionsHistory = () => {
  const groupedTransactions = groupTransactionsByDate(
    transactions as ITransaction[],
  );

  return (
    <View style={styles.container}>
      <View style={styles.items_container}>
        <ThemedText style={styles.header}>Transactions history</ThemedText>
      </View>
      <View style={styles.items_container}>
        {Object.keys(groupedTransactions).map((date) => (
          <View key={date} style={styles.items_group}>
            <ThemedText style={styles.items_header}>
              {formatDate(date)}
            </ThemedText>
            {groupedTransactions[date].map((transaction) => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default TransactionsHistory;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 24,
  },
  items_container: {
    borderRadius: 8,
  },
  items_group: {
    gap: 8,
    marginBottom: 32,
  },
  items_header: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
});
