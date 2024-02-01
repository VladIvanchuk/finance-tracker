import { StyleSheet, View } from "react-native";
import React from "react";
import ThemedSelect from "../ui/ThemedSelect";
import TransferAccountsIcon from "../Icons/transferAccounts";
import { IOperation, OperationItemType } from "@/types/Operations";

interface TransferAccountsProps {
  onChange: (value: string, type?: OperationItemType) => void;
  items?: { label: string; value: string }[];
  operation: IOperation;
}

const TransferAccounts = ({
  onChange,
  items,
  operation,
}: TransferAccountsProps) => {
  const handleFromAccountChange = (value: string) => {
    onChange(value, "fromAccountId");
  };

  const handleToAccountChange = (value: string) => {
    onChange(value, "toAccountId");
  };

  return (
    <View style={styles.container}>
      <ThemedSelect
        placeholder="From"
        items={items}
        onChange={handleFromAccountChange}
        disabled={
          operation.type === "transfer"
            ? operation.toAccountId.toString()
            : undefined
        }
      />
      <View style={styles.icon}>
        <TransferAccountsIcon />
      </View>
      <ThemedSelect
        placeholder="To"
        items={items}
        onChange={handleToAccountChange}
        disabled={
          operation.type === "transfer"
            ? operation.fromAccountId.toString()
            : undefined
        }
      />
    </View>
  );
};

export default TransferAccounts;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    gap: 16,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: "50%",
    top: "55%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 20,
  },
});
