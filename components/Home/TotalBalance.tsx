import Colors from "@/constants/Colors";
import { useAccountActions } from "@/hooks/useAccountActions";
import { useDatabase } from "@/hooks/useDatabase";
import { Transaction } from "@/schemas/Transaction";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import ThemedText from "../ui/ThemedText";

const { width } = Dimensions.get("window");

const TotalBalance = () => {
  const [totalBalance, setTotalBalance] = useState("");

  const { getTotalBalance } = useAccountActions();

  const { realm } = useDatabase();

  if (!realm) {
    throw new Error(
      "No Realm instance found. Make sure your component is wrapped in a DatabaseProvider."
    );
  }

  useEffect(() => {
    const updateBalance = () => {
      setTotalBalance(getTotalBalance());
    };

    const transactions = realm.objects<Transaction>("Transaction");
    transactions.addListener(updateBalance);

    updateBalance();

    return () => {
      transactions.removeListener(updateBalance);
    };
  }, [realm, getTotalBalance]);

  const scrollY = useRef(new Animated.Value(0)).current;

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
    gap: 12,
    paddingHorizontal: 14,
  },
  number: { color: Colors.text, fontWeight: "600", fontSize: 32 },
});
