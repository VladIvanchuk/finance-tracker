import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import ThemedText from "../ui/ThemedText";
import { StatisticType } from "@/types/StatisticsTypes";

interface StatsSwitchProps {
  selectedType: StatisticType;
  setSelectedType: React.Dispatch<React.SetStateAction<StatisticType>>;
}

const StatsSwitch = ({ selectedType, setSelectedType }: StatsSwitchProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSelectedType("income")}
        style={[styles.item, selectedType === "income" && styles.active]}
      >
        <ThemedText style={styles.text}>Income</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedType("expense")}
        style={[styles.item, selectedType === "expense" && styles.active]}
      >
        <ThemedText style={styles.text}>Expense</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default StatsSwitch;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 32,
    flexDirection: "row",
    backgroundColor: Colors.tabBarColor,
    padding: 6,
    marginBottom: 12,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 26,
  },
  active: {
    backgroundColor: Colors.tint,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
