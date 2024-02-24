import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";

interface StatsSortProps {
  sortItems: { label: string; value: string }[];
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}

const StatsSort = ({
  setSelectedSort,
  sortItems,
  selectedSort,
}: StatsSortProps) => {
  return (
    <Select onValueChange={setSelectedSort} defaultValue={selectedSort}>
      <SelectTrigger variant="outline" size="md" style={styles.container}>
        <FontAwesome5 name="sort-amount-down" size={20} color={Colors.text} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {sortItems.map(({ value, label }) => (
            <SelectItem key={value} label={label} value={value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default StatsSort;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabBarColor,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 0,
  },
});
