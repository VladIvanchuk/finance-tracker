import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { monthNames } from "@/constants/monthNames";
import ThemedButton from "../ui/ThemedButton";

interface YearPickerProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  startYear: number;
  endYear: number;
}

const YearPicker = ({
  selectedYear,
  onYearChange,
  startYear,
  endYear,
}: YearPickerProps) => {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  return (
    <ScrollView style={styles.wheel}>
      {years.map((year) => (
        <TouchableOpacity
          key={year}
          onPress={() => onYearChange(year)}
          style={styles.wheelItem}
        >
          <Text
            style={
              year === selectedYear
                ? styles.wheelItemTextSelected
                : styles.wheelItemText
            }
          >
            {year}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

interface MonthPickerWheelsProps {
  selectedYear: number;
  selectedMonth: number;
  onConfirm: (month: number, year: number) => void;
  onReset: () => void;
}

const MonthPickerWheels = ({
  selectedMonth,
  selectedYear,
  onConfirm,
  onReset,
}: MonthPickerWheelsProps) => {
  const [tempSelectedMonth, setTempSelectedMonth] = useState(selectedMonth);
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear);

  const startYear = new Date().getFullYear() - 10;
  const endYear = new Date().getFullYear();

  return (
    <View style={styles.pickerWrapper}>
      <View style={styles.pickerContainer}>
        <ScrollView style={styles.wheel}>
          {monthNames.map((month, index) => (
            <TouchableOpacity
              key={month}
              onPress={() => setTempSelectedMonth(index)}
              style={styles.wheelItem}
            >
              <Text
                style={
                  index === tempSelectedMonth
                    ? styles.wheelItemTextSelected
                    : styles.wheelItemText
                }
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <YearPicker
          selectedYear={tempSelectedYear}
          onYearChange={setTempSelectedYear}
          startYear={startYear}
          endYear={endYear}
        />
      </View>
      <View style={styles.buttons}>
        <ThemedButton
          style={{ flex: 1 }}
          action="secondary"
          label="Reset date"
          onPress={onReset}
        />
        <ThemedButton
          style={{ flex: 1 }}
          label="Confirm"
          onPress={() => onConfirm(tempSelectedMonth, tempSelectedYear)}
        />
      </View>
    </View>
  );
};

export default MonthPickerWheels;

const styles = StyleSheet.create({
  pickerWrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16,
  },

  wheel: {
    flex: 1,
  },
  wheelItem: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  wheelItemText: {
    fontSize: 20,
    color: "grey",
  },
  wheelItemTextSelected: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 4,
  },
});
