import { usePopToTop } from "@/hooks/usePopToTop";
import useThemedToast from "@/hooks/useThemedToast";
import { useTransactionActions } from "@/hooks/useTransactionActions";
import { AccountItemType } from "@/types/AccountTypes";
import { ITransaction, TransactionItemType } from "@/types/TransactionTypes";
import { getTransactionColor } from "@/utils/getTransactionColor";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
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
  const [isFormValidated, setIsFormValidated] = useState(true);
  const { createTransaction, editTransaction } = useTransactionActions();
  const popToTop = usePopToTop();

  const showToast = useThemedToast(() => setIsFormValidated(true));

  const handleContinue = () => {
    if (
      !operation.sum ||
      isNaN(Number(operation.sum)) ||
      Number(operation.sum) <= 0
    ) {
      showToast(
        "Invalid data",
        `Please enter a valid ${operation.type} sum.`,
        "error"
      );
      setIsFormValidated(false);
      return;
    }
    if (operation.type === "transfer") {
      if (
        operation.fromAccountId === undefined ||
        operation.toAccountId === undefined
      ) {
        showToast(
          "Invalid data",
          "Please select both source and destination accounts.",
          "error"
        );
        setIsFormValidated(false);
        return;
      }
    } else {
      if (!operation.categoryId) {
        showToast("Invalid data", "Please select a category.", "error");
        setIsFormValidated(false);
        return;
      }
      if (operation.accountId === undefined) {
        showToast("Invalid data", "Please select an account.", "error");
        setIsFormValidated(false);
        return;
      }
    }
    type === "create"
      ? createTransaction(operation)
      : editTransaction(operation);
    popToTop();
    showToast(
      "Success",
      `${
        operation.type.charAt(0).toUpperCase() + operation.type.slice(1)
      } ${type === "create" ? "created" : "edited"} successfully`,
      "success"
    );
  };

  const handleValueChange = (
    type: TransactionItemType | AccountItemType,
    value: string | boolean
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

  useEffect(() => {
    setIsFormValidated(true);
  }, [operation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setAlertVisible(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

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
    </View>
  );
};

export default TransactionForm;
