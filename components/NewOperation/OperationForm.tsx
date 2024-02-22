import ThemedToast from "@/components/ui/ThemedToast";
import { usePopToTop } from "@/hooks/usePopToTop";
import { useTransactionActions } from "@/hooks/useTransactionActions";
import { AccountItemType } from "@/types/AccountTypes";
import { OperationItemType } from "@/types/OperationTypes";
import { ITransaction } from "@/types/TransactionTypes";
import { getOperationColor } from "@/utils/defineOperationColor";
import { useToast } from "@gluestack-ui/themed";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import ThemedAlert from "../ui/ThemedAlert";
import NewOperationBody from "./NewOperationBody";
import NewOperationFooter from "./NewOperationFooter";
import NewOperationHeader from "./NewOperationHeader";

const OperationForm = ({
  operation,
  setOperation,
}: {
  operation: ITransaction;
  setOperation: React.Dispatch<React.SetStateAction<ITransaction>>;
}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(true);
  const { createTransaction } = useTransactionActions();
  const popToTop = usePopToTop();
  const toast = useToast();

  const showToast = useCallback(
    (
      title: string,
      message: string,
      action?: "warning" | "error" | "success" | "info" | "attention"
    ) => {
      toast.closeAll();
      toast.show({
        placement: "top",
        onCloseComplete: () => setIsFormValidated(true),
        render: ({ id }) => (
          <ThemedToast
            id={id}
            title={title}
            message={message}
            action={action}
          />
        ),
      });
    },
    [toast]
  );

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
    createTransaction(operation);
    popToTop();
    showToast(
      "Success",
      `${
        operation.type.charAt(0).toUpperCase() + operation.type.slice(1)
      } added successfully`,
      "success"
    );
  };

  const handleValueChange = (
    type: OperationItemType | AccountItemType,
    value: string
  ) => {
    setOperation((prev) => {
      const key = type === "account" ? "accountId" : type;
      return { ...prev, [key]: value };
    });
  };

  const dynamicStyles = StyleSheet.create({
    screen_wrapper: {
      flex: 1,
      backgroundColor: getOperationColor(operation.type),
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
      <NewOperationHeader setOperation={setOperation} operation={operation} />
      <NewOperationBody
        handleValueChange={handleValueChange}
        operationType={operation.type}
        operation={operation}
      />
      <NewOperationFooter
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

export default OperationForm;
