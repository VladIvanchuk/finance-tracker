import { formatShortDate } from "@/utils/formatShortDate";
import { groupTransactionsByDate } from "@/utils/transactionsUtils";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "../ui/ThemedText";
import TransactionItem from "./TransactionItem";
import { useMonthContext } from "@/context/MonthContext";
import { useDatabase } from "@/hooks/useDatabase";
import { useTransactionActions } from "@/hooks/useTransactionActions";
import { Transaction } from "@/schemas/Transaction";

interface GroupedTransactions {
  [key: string]: Transaction[];
}

const TransactionsHistory = () => {
  const { realm } = useDatabase();

  const { selectedYear, selectedMonth } = useMonthContext();
  const { getTransactionsByMonth } = useTransactionActions();
  const [groupedTransactions, setGroupedTransactions] =
    useState<GroupedTransactions>({});

  useEffect(() => {
    const updateTransactions = () => {
      const transactions = getTransactionsByMonth(selectedMonth, selectedYear);
      setGroupedTransactions(groupTransactionsByDate(transactions));
    };

    const transactions = realm.objects<Transaction>("Transaction");
    transactions.addListener(updateTransactions);

    updateTransactions();

    return () => {
      transactions.removeListener(updateTransactions);
    };
  }, [selectedMonth, selectedYear, getTransactionsByMonth, realm]);

  return (
    <View style={styles.container}>
      <View style={styles.items_container}>
        <ThemedText style={styles.header}>Transactions history</ThemedText>
      </View>
      <View style={styles.items_container}>
        {Object.keys(groupedTransactions)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map((dateKey) => (
            <View key={dateKey} style={styles.items_group}>
              <ThemedText style={styles.items_header}>
                {formatShortDate(dateKey)}
              </ThemedText>
              {groupedTransactions[dateKey].map((transaction) =>
                transaction.isValid() ? (
                  <TransactionItem
                    key={transaction._id.toString()}
                    {...transaction}
                  />
                ) : null,
              )}
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
    marginBottom: 24,
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
