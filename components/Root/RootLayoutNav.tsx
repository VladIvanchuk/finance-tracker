import { StatusBar } from "react-native";
import React, { useState } from "react";
import Providers from "@/lib/providers";
import { getOperationColor } from "@/utils/defineOperationColor";
import { StackActions } from "@react-navigation/native";
import { useNavigation, Stack } from "expo-router";
import ThemedAlert from "../ui/ThemedAlert";
import Colors from "@/constants/Colors";
import { HeaderBackButton } from "@react-navigation/elements";

const RootLayoutNav = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();
  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <Providers>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          animation: "slide_from_bottom",
          headerBackButtonMenuEnabled: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTintColor: Colors.text,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="income"
          options={{
            title: "Income",
            headerStyle: {
              backgroundColor: getOperationColor("income"),
            },
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => setAlertVisible(true)}
              />
            ),
          }}
        />
        <Stack.Screen
          name="transfer"
          options={{
            title: "Transfer",
            headerStyle: {
              backgroundColor: getOperationColor("transfer"),
            },
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => setAlertVisible(true)}
              />
            ),
          }}
        />
        <Stack.Screen
          name="expense"
          options={{
            title: "Expense",
            headerStyle: {
              backgroundColor: getOperationColor("expense"),
            },
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => setAlertVisible(true)}
              />
            ),
          }}
        />
        <Stack.Screen
          name="editAccount"
          options={{
            title: "Edit Account",
            headerStyle: {
              backgroundColor: Colors.tintDark,
            },
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => setAlertVisible(true)}
              />
            ),
          }}
        />
        <Stack.Screen
          name="addAccount"
          options={{
            title: "Add Account",
            headerStyle: {
              backgroundColor: Colors.tintDark,
            },
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => setAlertVisible(true)}
              />
            ),
          }}
        />
        <Stack.Screen
          name="transactionView/[id]"
          options={{
            title: "Transaction Details",
            headerLeft: (props) => (
              <HeaderBackButton {...props} onPress={handlePopToTop} />
            ),
          }}
        />
      </Stack>
      <ThemedAlert
        visible={alertVisible}
        title="Exit?"
        message="Are you sure you want to exit? Data will not be saved!"
        onClose={() => setAlertVisible(false)}
        type="exit"
        action={handlePopToTop}
      />
    </Providers>
  );
};

export default RootLayoutNav;
