import Colors from "@/constants/Colors";
import { currencies } from "@/data/currencies";
import { IAccount } from "@/types/AccountTypes";
import { ITransaction } from "@/types/TransactionTypes";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { ActionsheetItem, ActionsheetItemText } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ThemedActionSheet from "../ui/ThemedActionSheet";
import ThemedText from "../ui/ThemedText";
import { CurrencyType } from "@/types/TransactionTypes";

const NewTransactionHeader = ({
  setTransaction,
  operation,
  accountData,
  setAccountData,
}: {
  operation?: ITransaction;
  setTransaction?: React.Dispatch<React.SetStateAction<ITransaction>>;
  accountData?: IAccount;
  setAccountData?: React.Dispatch<React.SetStateAction<IAccount>>;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  let initNumber;

  if (operation) {
    initNumber = operation?.sum.toString();
  } else if (accountData) {
    initNumber = accountData?.balance.toString();
  } else {
    initNumber = "0";
  }

  const [number, onChangeNumber] = useState(initNumber);
  const handleChange = () => setShowPicker(!showPicker);

  useEffect(() => {
    if (setTransaction) {
      setTransaction((prev) => ({ ...prev, sum: parseFloat(number) }));
    }
    if (setAccountData) {
      setAccountData((prev) => ({ ...prev, balance: parseFloat(number) }));
    }
  }, [number, setTransaction]);

  const handleChangeCurrency = (currency: CurrencyType) => {
    if (setTransaction) {
      setTransaction((prev) => ({ ...prev, currency: currency }));
    }
    if (setAccountData) {
      setAccountData((prev) => ({ ...prev, currency: currency }));
    }
    handleChange();
  };

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
          onFocus={() => onChangeNumber("")}
          onBlur={() => !number && onChangeNumber("0")}
        />
        <TouchableOpacity onPress={handleChange}>
          <ThemedText style={{ fontWeight: "bold", fontSize: 64 }}>
            {operation?.currency
              ? getCurrencySymbol(operation.currency)
              : accountData?.currency
                ? getCurrencySymbol(accountData.currency)
                : null}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <ThemedActionSheet
        handleClose={handleChange}
        showActionSheet={showPicker}
        maxHeight={500}
        height={"auto"}
        actionSheetItems={
          <ScrollView style={{ width: "100%" }}>
            {currencies.map((currency) => (
              <ActionsheetItem
                key={currency}
                onPress={() => handleChangeCurrency(currency as CurrencyType)}
              >
                <ActionsheetItemText>{currency}</ActionsheetItemText>
              </ActionsheetItem>
            ))}
          </ScrollView>
        }
      />
    </View>
  );
};

export default NewTransactionHeader;

const styles = StyleSheet.create({
  header_container: {
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 24,
    gap: 10,
    maxHeight: 160,
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
