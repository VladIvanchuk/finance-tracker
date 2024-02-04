import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AccountCard from "./AccountCard";
import ThemedText from "../ui/ThemedText";
import TransactionItem from "../Home/TransactionItem";
import { IAccount } from "@/types/Accounts";
import { ITransaction } from "@/types/Transactions";

interface AccountItemProps {
  account: IAccount;
  width: number;
}

const AccountItem = ({ account, width }: AccountItemProps) => {
  return (
    <View style={[styles.itemContainer, { width }]}>
      <AccountCard {...account} />
      <ThemedText style={styles.transactionsHeader}>
        Transactions history
      </ThemedText>
      <ScrollView contentContainerStyle={styles.transactionsContainer}>
        {account.transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            {...(transaction as ITransaction)}
            useDate
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AccountItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 6,
  },
  transactionsContainer: {
    marginTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 10,
    gap: 12,
  },
  transactionsHeader: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 18,
  },
});
