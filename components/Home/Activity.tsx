import Colors, { palette } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseIcon from "../Icons/expense";
import IncomeIcon from "../Icons/income";
import ThemedText from "../ui/ThemedText";
import { useAccountActions } from "@/hooks/useAccountActions";
import { useDatabase } from "@/hooks/useDatabase";
import { Transaction } from "@/schemas/Transaction";
import { useMonthContext } from "@/context/MonthContext";

const Activity = () => {
  const { selectedMonth, selectedYear } = useMonthContext();

  const { getTotalExpenseByMonth, getTotalIncomeByMonth } = useAccountActions();
  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");

  const { realm } = useDatabase();

  useEffect(() => {
    const updateBalance = () => {
      setTotalExpense(getTotalExpenseByMonth(selectedMonth, selectedYear));
      setTotalIncome(getTotalIncomeByMonth(selectedMonth, selectedYear));
    };

    const transactions = realm.objects<Transaction>("Transaction");
    transactions.addListener(updateBalance);

    updateBalance();

    return () => {
      transactions.removeListener(updateBalance);
    };
  }, [
    realm,
    getTotalExpenseByMonth,
    getTotalIncomeByMonth,
    selectedMonth,
    selectedYear,
  ]);

  return (
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
          <ThemedText style={styles.activity_sum}>{totalIncome} ₴</ThemedText>
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
          <ThemedText style={styles.activity_sum}>{totalExpense} ₴</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  activity: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    marginTop: 8,
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
