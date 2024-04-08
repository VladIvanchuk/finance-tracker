import Colors from "@/constants/Colors";
import { useStatisticsAction } from "@/hooks/useStatisticsAction";
import { useDatabase } from "@/hooks/useDatabase";
import { Transaction } from "@/schemas/Transaction";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import ThemedText from "../ui/ThemedText";
import { Account } from "@/schemas/Account";

const { width } = Dimensions.get("window");

const TotalBalance = ({ scrollY }: { scrollY: Animated.Value }) => {
  const [totalBalance, setTotalBalance] = useState("");

  const { getTotalBalance } = useStatisticsAction();

  const { realm } = useDatabase();

  useEffect(() => {
    const updateBalance = async () => {
      const balance = await getTotalBalance();
      setTotalBalance(balance);
    };

    const transactions = realm.objects<Transaction>("Transaction");
    const accounts = realm.objects<Account>("Account");

    transactions.addListener(updateBalance);
    accounts.addListener(updateBalance);

    updateBalance();

    return () => {
      transactions.removeListener(updateBalance);
      accounts.removeListener(updateBalance);
    };
  }, [realm, getTotalBalance]);

  const balanceOpacity = scrollY.interpolate({
    inputRange: [100, 150],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const balanceScale = scrollY.interpolate({
    inputRange: [100, 150],
    outputRange: [1, 0.85],
    extrapolate: "clamp",
  });
  const balanceTranslateX = scrollY.interpolate({
    inputRange: [100, 200],
    outputRange: [0, width / 2 - 100],

    extrapolate: "clamp",
  });

  const marginTopScale = scrollY.interpolate({
    inputRange: [100, 210],
    outputRange: [32, 8],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={[
        styles.balance,
        {
          opacity: balanceOpacity,
          transform: [
            { scale: balanceScale },
            { translateX: balanceTranslateX },
          ],
          marginTop: marginTopScale,
        },
      ]}
    >
      <ThemedText style={styles.number}>{totalBalance} ₴</ThemedText>
    </Animated.View>
  );
};

export default TotalBalance;

const styles = StyleSheet.create({
  balance: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 14,
  },
  number: { color: Colors.text, fontWeight: "600", fontSize: 32 },
});
