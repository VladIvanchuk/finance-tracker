import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import ThemedText from "../ui/ThemedText";
import ThemedActionSheet from "../ui/ThemedActionSheet";
import MonthPickerWheels from "./MonthPickerWheels";
import { monthNames } from "@/constants/monthNames";
import { Icon, ChevronDownIcon } from "@gluestack-ui/themed";

const MonthPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const handleChange = () => setShowPicker(!showPicker);

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const formattedMonth = monthNames[selectedMonth];

  const handleConfirm = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    handleChange();
  };
  const handleReset = () => {
    setSelectedMonth(currentMonthIndex);
    setSelectedYear(currentYear);
    handleChange();
  };

  return (
    <TouchableOpacity onPress={handleChange} style={styles.container}>
      <ThemedText>
        {`${formattedMonth} ${
          currentYear !== selectedYear ? selectedYear : ""
        }`}
      </ThemedText>
      <Icon as={ChevronDownIcon} w="$4" h="$4" ml="$1" />
      <ThemedActionSheet
        handleClose={handleChange}
        showActionSheet={showPicker}
        maxHeight={360}
        actionSheetItems={
          <MonthPickerWheels
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onConfirm={handleConfirm}
            onReset={handleReset}
          />
        }
      />
    </TouchableOpacity>
  );
};

export default MonthPicker;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: "center",
    paddingVertical: 8,
    paddingLeft: 24,
    paddingRight: 18,
    flexDirection: "row",
    alignItems: "center",
  },
});