import Colors from "@/constants/Colors";
import { usePopToTop } from "@/hooks/usePopToTop";
import { AccountItemType, IAccount } from "@/types/AccountTypes";
import { TransactionItemType } from "@/types/TransactionTypes";
import { useToast } from "@gluestack-ui/themed";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import NewTransactionBody from "../NewTransaction/NewTransactionBody";
import NewTransactionFooter from "../NewTransaction/NewTransactionFooter";
import NewTransactionHeader from "../NewTransaction/NewTransactionHeader";
import ThemedAlert from "../ui/ThemedAlert";
import ThemedToast from "../ui/ThemedToast";
import { useAccountActions } from "@/hooks/useAccountActions";

const AccountForm = ({
  accountData,
  setAccountData,
}: {
  accountData: IAccount;
  setAccountData: React.Dispatch<React.SetStateAction<IAccount>>;
}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(true);
  const popToTop = usePopToTop();
  const toast = useToast();
  const { createAccount } = useAccountActions();

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
    createAccount(accountData);
    popToTop();
    showToast("Success", `Account added successfully`, "success");
  };

  const handleValueChange = (
    type: TransactionItemType | AccountItemType,
    value: string,
  ) => {
    setAccountData((prev) => {
      const key = type === "account" ? "accountId" : type;
      return { ...prev, [key]: value };
    });
  };

  const dynamicStyles = StyleSheet.create({
    screen_wrapper: {
      flex: 1,
      backgroundColor: Colors.tintDark,
    },
  });

  useEffect(() => {
    setIsFormValidated(true);
  }, [accountData]);

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
      <NewTransactionHeader
        accountData={accountData}
        setAccountData={setAccountData}
      />
      <NewTransactionBody
        operationType="account"
        handleValueChange={handleValueChange}
        operation={accountData}
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
export default AccountForm;
