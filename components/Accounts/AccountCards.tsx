import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import AccountItem from "./AccountItem";
import { useQuery } from "@realm/react";
import { Account } from "@/schemas/Account";

const { width: screenWidth } = Dimensions.get("window");

const CARD_MARGIN = 6;
const CARD_WIDTH = screenWidth * 0.88;
const SIDE_PADDING = (screenWidth - CARD_WIDTH) / 2 - CARD_MARGIN;

const AccountCards = () => {
  const accounts = useQuery(Account);

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
          key={account._id.toString()}
          account={account}
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
    alignItems: "center",
    paddingHorizontal: SIDE_PADDING,
  },
});
