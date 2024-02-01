import { StyleSheet, View } from "react-native";
import React from "react";
import { ExpenseIcon, IncomeIcon } from "..";
import Colors, { palette } from "@/constants/Colors";
import ThemedText from "../ui/ThemedText";

const Balance = () => {
  return (
    <>
      <View style={styles.balance}>
        <ThemedText style={styles.number}>13,590.00 ₴</ThemedText>
        <ThemedText style={styles.text}>Balance</ThemedText>
      </View>
      <View style={styles.activity}>
        <View style={styles.activity_item}>
          <View
            style={[
              styles.activity_item_icon,
              { backgroundColor: palette.green[100] },
            ]}
          >
            <IncomeIcon />
          </View>
          <View style={styles.activity_item_container}>
            <ThemedText
              style={[styles.activity_text, { color: palette.green[100] }]}
            >
              Income
            </ThemedText>
            <ThemedText style={styles.activity_sum}>5000 ₴</ThemedText>
          </View>
        </View>
        <View style={styles.activity_item}>
          <View
            style={[
              styles.activity_item_icon,
              { backgroundColor: palette.red[100] },
            ]}
          >
            <ExpenseIcon />
          </View>
          <View style={styles.activity_item_container}>
            <ThemedText
              style={[styles.activity_text, { color: palette.red[100] }]}
            >
              Expenses
            </ThemedText>
            <ThemedText style={styles.activity_sum}>12000 ₴</ThemedText>
          </View>
        </View>
      </View>
    </>
  );
};

export default Balance;

const styles = StyleSheet.create({
  balance: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  number: { color: Colors.text, fontWeight: "600", fontSize: 32 },
  text: {
    color: Colors.text,
    fontWeight: "500",
    fontSize: 20,
    paddingBottom: 4,
  },
  activity: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
    justifyContent: "space-between",
  },
  activity_text: {
    color: Colors.text,
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 2,
  },
  activity_sum: {
    color: Colors.text,
    fontWeight: "500",
    fontSize: 14,
  },
  activity_item: {
    flex: 1,
    backgroundColor: Colors.tintDark,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  activity_item_container: {},
  activity_item_icon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
