import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import {
  IOperation,
  IncomeExpenseOperation,
  OperationItemType,
  OperationType,
  TransferOperation,
} from "@/types/OperationTypes";
import { useToast } from "@gluestack-ui/themed";
import ThemedToast from "@/components/ui/ThemedToast";
import { useFocusEffect, useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";
import NewOperationBody from "./NewOperationBody";
import NewOperationFooter from "./NewOperationFooter";
import NewOperationHeader from "./NewOperationHeader";
import { getOperationColor } from "@/utils/defineOperationColor";
import ThemedAlert from "../ui/ThemedAlert";
import { AccountItemType } from "@/types/AccountTypes";
import { useRealm } from "@realm/react";
import { Transaction } from "@/schemas/Transaction";
import { BSON } from "realm";

const OperationForm = ({
  operationType,
  operation,
  setOperation,
}: {
  operationType: OperationType;
  operation: IOperation;
  setOperation: React.Dispatch<React.SetStateAction<IOperation>>;
}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(true);
  const navigation = useNavigation();
  const toast = useToast();
  const realm = useRealm();

  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

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

  const addTransaction = () => {
    realm.write(() => {
      let operationToCreate: Partial<Transaction>;

      if (operation.type === "income" || operation.type === "expense") {
        operationToCreate = {
          ...operation,
          accountId: operation.accountId
            ? new BSON.ObjectId(operation.accountId)
            : undefined,
          category: operation.category,
        };
      } else if (operation.type === "transfer") {
        operationToCreate = {
          ...operation,
          fromAccountId: operation.fromAccountId
            ? new BSON.ObjectId(operation.fromAccountId)
            : undefined,
          toAccountId: operation.toAccountId
            ? new BSON.ObjectId(operation.toAccountId)
            : undefined,
        };
      } else {
        throw new Error("Invalid operation type");
      }

      realm.create("Transaction", operationToCreate as Partial<Transaction>);
    });
  };

  const handleContinue = () => {
    if (
      !operation.sum ||
      isNaN(Number(operation.sum)) ||
      Number(operation.sum) <= 0
    ) {
      showToast(
        "Invalid data",
        `Please enter a valid ${operationType} sum.`,
        "error"
      );
      setIsFormValidated(false);
      return;
    }
    if (operation.type === "transfer") {
      if (operation.fromAccountId === null || operation.toAccountId === null) {
        showToast(
          "Invalid data",
          "Please select both source and destination accounts.",
          "error"
        );
        setIsFormValidated(false);
        return;
      }
    } else {
      if (!operation.category) {
        showToast("Invalid data", "Please select a category.", "error");
        setIsFormValidated(false);
        return;
      }
      if (operation.accountId === null) {
        showToast("Invalid data", "Please select an account.", "error");
        setIsFormValidated(false);
        return;
      }
    }
    addTransaction();
    handlePopToTop();
    showToast(
      "Success",
      `${
        operationType.charAt(0).toUpperCase() + operationType.slice(1)
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
      backgroundColor: getOperationColor(operationType),
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
        operationType={operationType}
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
          handlePopToTop();
        }}
      />
    </View>
  );
};

export default OperationForm;
