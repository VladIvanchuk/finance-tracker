import Colors from "@/constants/Colors";
import {
  ChevronDownIcon,
  Icon,
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
import ThemedText from "../ui/ThemedText";

interface StatsFilterProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const StatsFilter = ({
  selectedFilter,
  setSelectedFilter,
}: StatsFilterProps) => {
  return (
    <Select onValueChange={setSelectedFilter} defaultValue={selectedFilter}>
      <SelectTrigger variant="outline" size="md" style={styles.container}>
        <ThemedText style={{ fontWeight: "500" }}>{selectedFilter}</ThemedText>
        <Icon mt={1} as={ChevronDownIcon} color={Colors.text} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="Categories" value="Categories" />
          <SelectItem label="Transactions" value="Transactions" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default StatsFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabBarColor,
    paddingLeft: 16,
    paddingRight: 14,
    paddingVertical: 8,
    gap: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 0,
  },
});
