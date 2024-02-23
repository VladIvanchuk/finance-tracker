import Colors from "@/constants/Colors";
import { monthNames } from "@/constants/monthNames";
import { ChevronDownIcon, Icon } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedActionSheet from "../ui/ThemedActionSheet";
import ThemedText from "../ui/ThemedText";
import MonthPickerWheels from "./MonthPickerWheels";
import { useMonthContext } from "@/context/MonthContext";
import { FontAwesome5 } from "@expo/vector-icons";

const MonthPicker = () => {
  const {
    selectedYear,
    selectedMonth,
    setSelectedMonth,
    setSelectedYear,
    currentMonthIndex,
    currentYear,
  } = useMonthContext();

  const [showPicker, setShowPicker] = useState(false);
  const handleChange = () => setShowPicker(!showPicker);

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

  const handlePrevMonth = () => {
    if (selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
    } else {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth < 11) {
      setSelectedMonth(selectedMonth + 1);
    } else {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handlePrevMonth}>
        <FontAwesome5 name="arrow-circle-left" size={24} color={Colors.text} />
      </TouchableOpacity>
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
      <TouchableOpacity onPress={handleNextMonth}>
        <FontAwesome5 name="arrow-circle-right" size={24} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default MonthPicker;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
    marginTop: 14,
    marginBottom: 18,
  },
});
