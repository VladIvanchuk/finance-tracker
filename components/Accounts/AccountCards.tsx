import { ScrollView, StyleSheet, Dimensions, View } from "react-native";
import accounts from "@/mock/accounts.json";
import AccountItem from "./AccountItem";
import { IAccount } from "@/types/Accounts";
const { width: screenWidth } = Dimensions.get("window");

const CARD_WIDTH = screenWidth;

const AccountCards = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.wrapper}
      snapToInterval={CARD_WIDTH}
      decelerationRate="fast"
    >
      {accounts.map((account) => (
        <AccountItem
          key={account.id}
          account={account as IAccount}
          width={CARD_WIDTH}
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
  },
});
