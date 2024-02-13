import { IAccount } from "@/types/AccountTypes";
import { ITransaction } from "@/types/TransactionTypes";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import TransactionItem from "../Home/TransactionItem";
import ThemedText from "../ui/ThemedText";
import AccountCard from "./AccountCard";

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
  console.log(account);

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
