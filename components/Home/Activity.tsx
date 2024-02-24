import Colors, { palette } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ExpenseIcon from "../Icons/expense";
import IncomeIcon from "../Icons/income";
import ThemedText from "../ui/ThemedText";
import { useDatabase } from "@/hooks/useDatabase";
import { Transaction } from "@/schemas/Transaction";
import { useMonthContext } from "@/context/MonthContext";
import { useRouter } from "expo-router";
import { useStatisticsAction } from "@/hooks/useStatisticsAction";

const Activity = () => {
  const { selectedMonth, selectedYear } = useMonthContext();
  const router = useRouter();

  const { getTotalExpenseByMonth, getTotalIncomeByMonth } =
    useStatisticsAction();
  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");

  const { realm } = useDatabase();

  const handleLinkPress = (type: "income" | "expense") => {
    router.navigate({ pathname: "/stats", params: { type: type } });
  };

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
      <TouchableOpacity
        onPress={() => handleLinkPress("income")}
        style={styles.activity_item}
      >
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLinkPress("expense")}
        style={styles.activity_item}
      >
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
      </TouchableOpacity>
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
