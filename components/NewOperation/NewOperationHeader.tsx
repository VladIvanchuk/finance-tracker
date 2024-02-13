import Colors from "@/constants/Colors";
import { IAccount } from "@/types/AccountTypes";
import { ITransaction } from "@/types/TransactionTypes";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ThemedText from "../ui/ThemedText";

const NewOperationHeader = ({
  setOperation,
  operation,
  accountData,
  setAccountData,
}: {
  operation?: ITransaction;
  setOperation?: React.Dispatch<React.SetStateAction<ITransaction>>;
  accountData?: IAccount;
  setAccountData?: React.Dispatch<React.SetStateAction<IAccount>>;
}) => {
  const [number, onChangeNumber] = useState("");

  useEffect(() => {
    if (setOperation) {
      setOperation((prev) => ({ ...prev, sum: parseFloat(number) }));
    }
    if (setAccountData) {
      setAccountData((prev) => ({ ...prev, balance: parseFloat(number) }));
    }
  }, [number, setOperation]);

  return (
    <View style={styles.header_container}>
      <ThemedText style={{ fontWeight: "bold", fontSize: 18, opacity: 0.8 }}>
        {accountData ? "Enter account balance" : "How much?"}
      </ThemedText>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor={Colors.text}
        />
        <ThemedText style={{ fontWeight: "bold", fontSize: 64 }}>
          {operation?.currency
            ? getCurrencySymbol(operation.currency)
            : accountData?.currency
              ? getCurrencySymbol(accountData.currency)
              : null}
        </ThemedText>
      </View>
    </View>
  );
};

export default NewOperationHeader;

const styles = StyleSheet.create({
  header_container: {
    justifyContent: "flex-end",
    flex: 2,
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 64,
    color: Colors.text,
  },
});
