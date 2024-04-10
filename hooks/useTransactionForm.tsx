import useCurrencies from "@/hooks/useCurrencies";
import { usePopToTop } from "@/hooks/usePopToTop";
import useThemedToast from "@/hooks/useThemedToast";
import { useTransactionActions } from "@/hooks/useTransactionActions";
import { CurrencyType, ITransaction } from "@/types/TransactionTypes";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { useAccountActions } from "./useAccountActions";

interface UseTransactionFormProps {
  type?: "edit" | "create";
  operation: ITransaction;
  setTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
  setCurrencyAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTransactionForm = ({
  operation,
  setTransaction,
  type,
  setCurrencyAlertVisible,
  setAlertVisible,
}: UseTransactionFormProps) => {
  const [shouldExecute, setShouldExecute] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(true);
  const { createTransaction, editTransaction } = useTransactionActions();
  const { convertCurrencies } = useCurrencies();
  const showToast = useThemedToast(() => setIsFormValidated(true));
  const popToTop = usePopToTop();
  const { getAccountById } = useAccountActions();

  let accountCurrency: CurrencyType | null = null;

  if (operation.accountId) {
    accountCurrency = getAccountById(operation.accountId)?.currency ?? null;
  } else if (operation.toAccountId) {
    accountCurrency = getAccountById(operation.toAccountId)?.currency ?? null;
  }

  const executeTransaction = () => {
    const transactionMethod =
      type === "create" ? createTransaction : editTransaction;
    transactionMethod(operation);
    popToTop();
    showToast(
      "Success",
      `${operation.type.charAt(0).toUpperCase() + operation.type.slice(1)} ${type === "create" ? "created" : "edited"} successfully`,
      "success",
    );
  };

  const convertCurrency = async () => {
    const amount = operation.sum;
    const fromCurrency = operation.currency;
    const toCurrency = accountCurrency;

    if (operation.type === "transfer") {
      setShouldExecute(true);
      return;
    }

    if (!amount || !fromCurrency || !toCurrency) {
      return;
    }

    try {
      const convertedAmount = await convertCurrencies(
        amount,
        fromCurrency,
        toCurrency,
      );

      if (convertedAmount === null) {
        console.error(
          "Currency conversion failed. No converted amount was returned.",
        );
        return;
      }

      setTransaction((prevOperation) => ({
        ...prevOperation,
        sum: convertedAmount,
        currency: toCurrency,
      }));

      setShouldExecute(true);
    } catch (error) {
      console.error("Error during currency conversion:", error);
    }
  };

  const handleContinue = () => {
    if (
      !operation.sum ||
      isNaN(Number(operation.sum)) ||
      Number(operation.sum) <= 0
    ) {
      showToast(
        "Invalid data",
        `Please enter a valid ${operation.type} sum.`,
        "error",
      );
      setIsFormValidated(false);
      return;
    }
    if (operation.type === "transfer") {
      if (operation.fromAccountId) {
        const sourceAccount = getAccountById(operation.fromAccountId);
        if (sourceAccount && sourceAccount.balance < operation.sum) {
          showToast(
            "Insufficient balance",
            "Insufficient balance in source account.",
            "error",
          );
          setIsFormValidated(false);
          return;
        }
      }
      if (
        operation.fromAccountId === undefined ||
        operation.toAccountId === undefined
      ) {
        showToast(
          "Invalid data",
          "Please select both source and destination accounts.",
          "error",
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
    if (operation.currency !== accountCurrency) {
      setCurrencyAlertVisible(true);
    } else {
      setShouldExecute(true);
    }
  };

  useEffect(() => {
    if (shouldExecute) {
      executeTransaction();
      setShouldExecute(false);
    }
  }, [shouldExecute]);

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
    }, []),
  );

  return {
    handleContinue,
    convertCurrency,
    isFormValidated,
    accountCurrency,
  };
};
