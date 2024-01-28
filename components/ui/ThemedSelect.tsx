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
interface ThemedSelectProps {
  placeholder: string;
  items: Array<{
    label: string;
    value: string;
    isDisabled?: boolean;
  }>;
  onChange: (value: string) => void;
}

const ThemedSelect = ({ placeholder, items, onChange }: ThemedSelectProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger variant="outline" size="xl">
        <SelectInput placeholder={placeholder} />
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
          {items.map((item) => (
            <SelectItem
              key={item.value}
              label={item.label}
              value={item.value}
              isDisabled={item.isDisabled}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default ThemedSelect;

const styles = StyleSheet.create({});
