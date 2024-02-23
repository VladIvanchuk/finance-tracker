import Colors from "@/constants/Colors";
import { usePopToTop } from "@/hooks/usePopToTop";
import Providers from "@/providers/providers";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import ThemedAlert from "../ui/ThemedAlert";

const RootLayoutNav = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const popToTop = usePopToTop();

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
          name="transactionAdd/[type]"
          options={{
            headerLeft: (props) => (
              <HeaderBackButton {...props} onPress={popToTop} />
            ),
          }}
        />
        <Stack.Screen
          name="transactionEdit/[id]"
          options={{
            headerLeft: (props) => (
              <HeaderBackButton {...props} onPress={popToTop} />
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
          name="accountEdit/[id]"
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
          name="transactionView/[id]"
          options={{
            title: "Transaction Details",
            headerLeft: (props) => (
              <HeaderBackButton {...props} onPress={popToTop} />
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
        action={popToTop}
      />
    </Providers>
  );
};

export default RootLayoutNav;
