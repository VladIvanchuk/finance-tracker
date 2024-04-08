import { usePopToTop } from "@/hooks/usePopToTop";
import { useTransactionForm } from "@/hooks/useTransactionForm";
import { AccountItemType } from "@/types/AccountTypes";
import { ITransaction, TransactionItemType } from "@/types/TransactionTypes";
import { getTransactionColor } from "@/utils/getTransactionColor";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedAlert from "../ui/ThemedAlert";
import NewTransactionBody from "./NewTransactionBody";
import NewTransactionFooter from "./NewTransactionFooter";
import NewTransactionHeader from "./NewTransactionHeader";

const TransactionForm = ({
  type = "create",
  operation,
  setTransaction,
}: {
  type?: "edit" | "create";
  operation: ITransaction;
  setTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [currencyAlertVisible, setCurrencyAlertVisible] = useState(false);
  const popToTop = usePopToTop();

  const { handleContinue, convertCurrency, isFormValidated, accountCurrency } =
    useTransactionForm({
      operation,
      setTransaction,
      type,
      setCurrencyAlertVisible,
      setAlertVisible,
    });

  const handleValueChange = (
    type: TransactionItemType | AccountItemType,
    value: string | boolean,
  ) => {
    setTransaction((prev) => {
      const key = type === "account" ? "accountId" : type;
      return { ...prev, [key]: value };
    });
  };

  const dynamicStyles = StyleSheet.create({
    screen_wrapper: {
      flex: 1,
      backgroundColor: getTransactionColor(operation.type),
    },
  });

  return (
    <View style={dynamicStyles.screen_wrapper}>
      <NewTransactionHeader
        setTransaction={setTransaction}
        operation={operation}
      />
      <NewTransactionBody
        handleValueChange={handleValueChange}
        operationType={operation.type}
        operation={operation}
      />
      <NewTransactionFooter
        onPress={handleContinue}
        isDisabled={!isFormValidated}
      />
      <ThemedAlert
        visible={alertVisible}
        title="Exit?"
        message="Are you sure you want to exit? Data will not be saved!"
        onClose={() => setAlertVisible(false)}
        type="exit"
        action={() => {
          setAlertVisible(false);
          popToTop();
        }}
      />
      <ThemedAlert
        visible={currencyAlertVisible}
        title="Currency conversion"
        message={`You are trying to add a ${operation.currency} transaction to a ${accountCurrency} account. The amount will be converted automatically.`}
        onClose={() => setCurrencyAlertVisible(false)}
        type="confirm"
        action={() => {
          convertCurrency();
          setCurrencyAlertVisible(false);
        }}
      />
    </View>
  );
};

export default TransactionForm;
