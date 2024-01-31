import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ChevronDownIcon,
  Icon,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import Colors from "@/constants/Colors";
interface ThemedSelectProps {
  placeholder?: string;
  items?: Array<{
    label: string;
    value: string;
  }>;
  onChange: (value: string) => void;
}

const ThemedSelect = ({ placeholder, items, onChange }: ThemedSelectProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger variant="outline" size="xl" style={styles.input_container}>
        <SelectInput placeholder={placeholder} style={styles.input} />
        <SelectIcon>
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {items?.map((item) => (
            <SelectItem
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default ThemedSelect;

const styles = StyleSheet.create({
  input_container: {
    borderRadius: 16,
    paddingRight: 12,
    borderColor: Colors.border,
    height: 60,
  },
  input: {
    fontSize: 18,
  },
  select_Icon: {
    marginTop: 5,
  },
});
