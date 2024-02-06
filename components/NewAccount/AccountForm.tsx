import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AccountItemType, IAccount } from "@/types/Accounts";
import { useToast } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "expo-router";
import ThemedAlert from "../ui/ThemedAlert";
import { getOperationColor } from "@/utils/defineOperationColor";
import { StackActions } from "@react-navigation/native";
import NewOperationBody from "../NewOperation/NewOperationBody";
import NewOperationFooter from "../NewOperation/NewOperationFooter";
import NewOperationHeader from "../NewOperation/NewOperationHeader";
import ThemedToast from "../ui/ThemedToast";
import Colors from "@/constants/Colors";
import { OperationItemType } from "@/types/Operations";

const AccountForm = ({
  accountData,
  setAccountData,
}: {
  accountData: IAccount;
  setAccountData: React.Dispatch<React.SetStateAction<IAccount>>;
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
      !accountData.balance ||
      isNaN(Number(accountData.balance)) ||
      Number(accountData.balance) <= 0
    ) {
      showToast("Invalid data", `Please enter a valid balance.`, "error");
      setIsFormValidated(false);
      return;
    }
    handlePopToTop();
    showToast("Success", `Account added successfully`, "success");
  };

  const handleValueChange = (
    type: OperationItemType | AccountItemType,
    value: string
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
    }, [])
  );

  return (
    <View style={dynamicStyles.screen_wrapper}>
      <NewOperationHeader
        accountData={accountData}
        setAccountData={setAccountData}
      />
      <NewOperationBody
        operationType="account"
        handleValueChange={handleValueChange}
        operation={accountData}
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
export default AccountForm;
