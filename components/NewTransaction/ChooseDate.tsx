import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { format, isSameDay, subDays } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../ui/ThemedText";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface ChooseDateProps {
  onChange: (value: string) => void;
  defaultValue?: Date;
}

const ChooseDate = ({ onChange, defaultValue }: ChooseDateProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultValue ?? new Date(),
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const today = useMemo(() => new Date(), []);
  const yesterday = useMemo(() => subDays(today, 1), [today]);

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback(
    (date: Date) => {
      hideDatePicker();
      setSelectedDate(date);
      onChange(format(date, "yyyy-MM-dd")); // Use ISO 8601 date format without time
    },
    [hideDatePicker, onChange],
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onChange(format(date, "yyyy-MM-dd")); // Use ISO 8601 date format without time
    },
    [onChange],
  );

  const isActiveDate = useCallback(
    (date: Date) => isSameDay(date, selectedDate),
    [selectedDate],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.item, isActiveDate(today) && styles.active]}
        onPress={() => handleDateChange(today)}
        accessibilityRole="button"
        accessibilityLabel="Select today's date"
      >
        <ThemedText>Today</ThemedText>
        <ThemedText>{format(today, "dd.MM")}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, isActiveDate(yesterday) && styles.active]}
        onPress={() => handleDateChange(yesterday)}
        accessibilityRole="button"
        accessibilityLabel="Select yesterday's date"
      >
        <ThemedText>Yesterday</ThemedText>
        <ThemedText>{format(yesterday, "dd.MM")}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.item,
          !isSameDay(selectedDate, today) &&
            !isSameDay(selectedDate, yesterday) &&
            styles.active,
        ]}
        onPress={showDatePicker}
        accessibilityRole="button"
        accessibilityLabel="Pick a custom date"
      >
        <AntDesign name="calendar" size={24} color={Colors.border} />
        <ThemedText>
          {selectedDate &&
          !isSameDay(selectedDate, today) &&
          !isSameDay(selectedDate, yesterday)
            ? format(selectedDate, "dd.MM.yyyy")
            : "Pick a date"}
        </ThemedText>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectedDate}
      />
    </View>
  );
};

export default ChooseDate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  item: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  active: {
    backgroundColor: Colors.tintDark,
  },
});
