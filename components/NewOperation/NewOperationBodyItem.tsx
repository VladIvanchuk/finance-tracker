import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import ThemedSelect from "../ui/ThemedSelect";
import { OperationType } from "@/types/Operations";
import ThemedInput from "../ui/ThemedInput";
import Attachment from "./Attachment";
import Repeat from "./Repeat";

interface NewOperationBodyItemProps {
  id: string;
  type:
    | "category"
    | "currency"
    | "account"
    | "description"
    | "attachment"
    | "repeat";
  items?: { label: string; value: string }[];
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
    case "account":
      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
        />
      );
    case "description":
      return <ThemedInput placeholder={`Description`} onChange={onChange} />;
    case "attachment":
      return <Attachment onChange={onChange} />;
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
