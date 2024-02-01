import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import ThemedText from "../ui/ThemedText";
import TransactionItem from "./TransactionItem";

const TransactionsHistory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerGradient}>
        <ThemedText style={styles.header}>Transactions history</ThemedText>
      </View>
      <ScrollView style={styles.items_container}>
        <View style={styles.items_group}>
          <ThemedText style={styles.items_header}>Today</ThemedText>
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
        </View>
        <View style={styles.items_group}>
          <ThemedText style={styles.items_header}>Yesterday</ThemedText>
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
          <TransactionItem />
        </View>
        <View style={styles.items_group}>
          <ThemedText style={styles.items_header}>29 January</ThemedText>
          <TransactionItem />
          <TransactionItem />
        </View>
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
