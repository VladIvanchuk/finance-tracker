import Colors from "@/constants/Colors";
import { useAccountActions } from "@/hooks/useAccountActions";
import { useGoBack } from "@/hooks/useGoBack";
import useThemedToast from "@/hooks/useThemedToast";
import { AccountItemType, IAccount } from "@/types/AccountTypes";
import { TransactionItemType } from "@/types/TransactionTypes";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import NewTransactionBody from "../NewTransaction/NewTransactionBody";
import NewTransactionFooter from "../NewTransaction/NewTransactionFooter";
import NewTransactionHeader from "../NewTransaction/NewTransactionHeader";
import ThemedAlert from "../ui/ThemedAlert";

const AccountForm = ({
  type = "create",
  accountData,
  setAccountData,
}: {
  type?: "edit" | "create";
  accountData: IAccount;
  setAccountData: React.Dispatch<React.SetStateAction<IAccount>>;
}) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(true);
  const goBack = useGoBack();
  const { createAccount, editAccount } = useAccountActions();

  console.log(accountData);

  const showToast = useThemedToast(() => setIsFormValidated(true));

  const handleContinue = () => {
    if (!accountData.name) {
      showToast("Invalid data", "Please select an account name.", "error");
      setIsFormValidated(false);
      return;
    }
    if (!accountData.type) {
      showToast("Invalid data", "Please select an account type.", "error");
      setIsFormValidated(false);
      return;
    }
    type === "create" ? createAccount(accountData) : editAccount(accountData);
    goBack();
    showToast(
      "Success",
      `Account ${type === "create" ? "created" : "edited"} successfully`,
      "success",
    );
  };

  const handleValueChange = (
    type: TransactionItemType | AccountItemType,
    value: string | boolean,
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
          goBack();
        }}
      />
    </View>
  );
};
export default AccountForm;
