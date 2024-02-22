import { Transaction } from "@/schemas/Transaction";
import { TransactionItemType } from "@/types/TransactionTypes";
import { ObjectId } from "bson";
import React from "react";
import { StyleSheet, View } from "react-native";
import TransferAccountsIcon from "../Icons/transferAccounts";
import ThemedSelect from "../ui/ThemedSelect";

interface TransferAccountsProps {
  onChange: (value: string, type?: TransactionItemType) => void;
  items?: { label: string; value: string | ObjectId }[];
  operation: Partial<Transaction>;
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
            ? operation.toAccount?._id.toString()
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
            ? operation.fromAccount?._id.toString()
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
