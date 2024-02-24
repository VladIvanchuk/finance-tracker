import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../ui/ThemedText";
import { periods } from "@/data/statisticPeriods";

interface StatsHeaderProps {
  selectedPeriod: string;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
}

const StatsHeader = ({
  selectedPeriod,
  setSelectedPeriod,
}: StatsHeaderProps) => {
  return (
    <View style={styles.container}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period}
          onPress={() => setSelectedPeriod(period)}
          style={[
            styles.header_item,
            selectedPeriod === period && { backgroundColor: Colors.tint },
          ]}
        >
          <ThemedText style={{ fontWeight: "500" }}>{period}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StatsHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.tabBarColor,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  header_item: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
