import React from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import AccountCard from "./AccountCard";
import ThemedText from "../ui/ThemedText";
import TransactionItem from "../Home/TransactionItem";
import { IAccount } from "@/types/AccountTypes";
import { ITransaction } from "@/types/TransactionTypes";

interface AccountItemProps {
  account: IAccount;
  width: number;
  marginHorizontal: number;
}

const AccountItem = ({
  account,
  width,
  marginHorizontal,
}: AccountItemProps) => {
  return (
    <View style={{ width, marginHorizontal }}>
      <AccountCard {...account} />
      <ThemedText style={styles.transactionsHeader}>
        Transactions history
      </ThemedText>
      <Animated.ScrollView contentContainerStyle={styles.transactionsContainer}>
        {account.transactions &&
          account.transactions.map((transaction) => (
            <TransactionItem
              key={transaction._id.toString()}
              {...(transaction as ITransaction)}
              useDate
            />
          ))}
      </Animated.ScrollView>
    </View>
  );
};

export default AccountItem;

const styles = StyleSheet.create({
  transactionsContainer: {
    marginTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 6,
    gap: 12,
  },
  transactionsHeader: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 18,
  },
});
