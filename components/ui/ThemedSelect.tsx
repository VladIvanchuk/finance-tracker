import Colors from "@/constants/Colors";
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
import { ObjectId } from "bson";
import React from "react";
import { StyleSheet } from "react-native";
import ThemedButton from "./ThemedButton";

interface ThemedSelectProps {
  placeholder?: string;
  items?: Array<{
    label: string;
    value: string | ObjectId;
  }>;
  onChange: (value: string) => void;
  isAddButton?: boolean;
  addButtonAction?: () => void;
  defaultValue?: string;
  disabled?: string;
  selectedValue?: string;
  initialLabel?: string;
}

const ThemedSelect = ({
  placeholder,
  items,
  onChange,
  isAddButton = true,
  addButtonAction,
  defaultValue,
  disabled,
  selectedValue,
  initialLabel,
}: ThemedSelectProps) => {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      style={{ flex: 1 }}
      selectedValue={selectedValue}
      initialLabel={initialLabel}
    >
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
                key={item.value.toString()}
                label={item.label}
                value={item.value.toString()}
                disabled={item.value === disabled}
                style={item.value === disabled && { opacity: 0.1 }}
              />
            ))}
          </ScrollView>
          {isAddButton && (
            <ThemedButton
              label="Add new"
              style={styles.addButton}
              bg="$secondary400"
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
