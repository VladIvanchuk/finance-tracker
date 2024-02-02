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
    transactions as ITransaction[]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerGradient}>
        <ThemedText style={styles.header}>Transactions history</ThemedText>
      </View>
      <ScrollView style={styles.items_container}>
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
      </ScrollView>
    </View>
  );
};

export default TransactionsHistory;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  header: {
    fontSize: 18,
    fontWeight: "500",
  },
  headerGradient: {
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  items_container: {
    marginBottom: 446,
    borderRadius: 8,
    paddingHorizontal: 10,
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
