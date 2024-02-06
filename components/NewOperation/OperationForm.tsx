import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import {
  IOperation,
  OperationItemType,
  OperationType,
} from "@/types/Operations";
import { useToast } from "@gluestack-ui/themed";
import ThemedToast from "@/components/ui/ThemedToast";
import { useFocusEffect, useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";
import NewOperationBody from "./NewOperationBody";
import NewOperationFooter from "./NewOperationFooter";
import NewOperationHeader from "./NewOperationHeader";
import { getOperationColor } from "@/utils/defineOperationColor";
import ThemedAlert from "../ui/ThemedAlert";
import { AccountItemType } from "@/types/Accounts";

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

  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const showToast = useCallback(
    (
      title: string,
      message: string,
      action?: "warning" | "error" | "success" | "info" | "attention",
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
    [toast],
  );

  const handleContinue = () => {
    if (
      !operation.sum ||
      isNaN(Number(operation.sum)) ||
      Number(operation.sum) <= 0
    ) {
      showToast(
        "Invalid data",
        `Please enter a valid ${operationType} sum.`,
        "error",
      );
      setIsFormValidated(false);
      return;
    }
    if (operation.type === "transfer") {
      if (operation.fromAccountId === 0 || operation.toAccountId === 0) {
        showToast(
          "Invalid data",
          "Please select both source and destination accounts.",
          "error",
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
      if (operation.accountId === 0) {
        showToast("Invalid data", "Please select an account.", "error");
        setIsFormValidated(false);
        return;
      }
    }
    handlePopToTop();
    showToast(
      "Success",
      `${
        operationType.charAt(0).toUpperCase() + operationType.slice(1)
      } added successfully`,
      "success",
    );
  };

  const handleValueChange = (
    type: OperationItemType | AccountItemType,
    value: string,
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
    }, []),
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
