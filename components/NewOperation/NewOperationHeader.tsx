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
import { CurrencyType } from "@/types/OperationTypes";

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
  const [showPicker, setShowPicker] = useState(false);
  const handleChange = () => setShowPicker(!showPicker);

  useEffect(() => {
    if (setOperation) {
      setOperation((prev) => ({ ...prev, sum: parseFloat(number) }));
    }
    if (setAccountData) {
      setAccountData((prev) => ({ ...prev, balance: parseFloat(number) }));
    }
  }, [number, setOperation]);

  const handleChangeCurrency = (currency: CurrencyType) => {
    if (setOperation) {
      setOperation((prev) => ({ ...prev, currency: currency }));
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

export default NewOperationHeader;

const styles = StyleSheet.create({
  header_container: {
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
    maxHeight: 150,
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
