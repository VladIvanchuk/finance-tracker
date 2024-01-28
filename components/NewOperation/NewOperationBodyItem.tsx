import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import ThemedSelect from "../ui/ThemedSelect";
import { OperationType } from "@/types/Operations";

interface NewOperationBodyItemProps {
  id: string;
  type: keyof OperationType;
  items: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const NewOperationBodyItem = ({
  type,
  onChange,
  items,
}: NewOperationBodyItemProps) => {
  switch (type) {
    case "category":
    case "currency":
    case "accountId":
      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
        />
      );
    default:
      return (
        <View style={styles.body_item}>
          <Text>ModalScreen</Text>
        </View>
      );
  }
};

export default NewOperationBodyItem;

const styles = StyleSheet.create({
  body_item: {
    height: 56,
    backgroundColor: "transparent",
    borderColor: Colors.border,
  },
});
