import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import accounts from "@/mock/accounts.json";
import AccountItem from "./AccountItem";
import { IAccount } from "@/types/Accounts";

const { width: screenWidth } = Dimensions.get("window");

const CARD_MARGIN = 6;
const CARD_WIDTH = screenWidth * 0.88;
const SIDE_PADDING = (screenWidth - CARD_WIDTH) / 2 - CARD_MARGIN;

const AccountCards = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.wrapper}
      snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
      decelerationRate="fast"
    >
      {accounts.map((account) => (
        <AccountItem
          key={account.id}
          account={account as IAccount}
          width={CARD_WIDTH}
          marginHorizontal={CARD_MARGIN}
        />
      ))}
    </ScrollView>
  );
};

export default AccountCards;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 24,
    alignItems: "center",
    paddingHorizontal: SIDE_PADDING,
  },
});
