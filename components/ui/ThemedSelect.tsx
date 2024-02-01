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
import Colors, { palette } from "@/constants/Colors";
import ThemedButton from "./ThemedButton";
interface ThemedSelectProps {
  placeholder?: string;
  items?: Array<{
    label: string;
    value: string;
  }>;
  onChange: (value: string) => void;
  isAddButton?: boolean;
  addButtonAction?: () => void;
}

const ThemedSelect = ({
  placeholder,
  items,
  onChange,
  isAddButton = true,
  addButtonAction,
}: ThemedSelectProps) => {
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
        <SelectContent style={styles.selectContent}>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <ScrollView style={styles.scrollView}>
            {items?.map((item) => (
              <SelectItem
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </ScrollView>
          {isAddButton && (
            <ThemedButton
              label="Add new"
              style={styles.addButton}
              bg="$secondary600"
              onPress={addButtonAction}
            />
          )}
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
  selectContent: {
    maxHeight: 550,
  },
  scrollView: {
    width: "100%",
  },
  addButton: {
    marginTop: 10,
    marginBottom: 4,
    width: "100%",
  },
});
