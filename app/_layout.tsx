import { palette } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  StackActions,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { BackHandler, StatusBar } from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { HeaderBackButton } from "@react-navigation/elements";
import ThemedAlert from "@/components/ui/ThemedAlert";
import { getOperationColor } from "@/utils/defineOperationColor";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [alertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();
  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <GluestackUIProvider config={config} colorMode="dark">
      <ThemeProvider value={DarkTheme}>
        <StatusBar barStyle="light-content" />
        <Stack
          screenOptions={{
            animation: "slide_from_bottom",
            headerBackButtonMenuEnabled: true,
            headerShadowVisible: false,
            headerTitleAlign: "center",
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
        </Stack>
      </ThemeProvider>
      <ThemedAlert
        visible={alertVisible}
        title="Exit?"
        message="Are you sure you want to exit? Data will not be saved!"
        onClose={() => setAlertVisible(false)}
        type="exit"
        action={handlePopToTop}
      />
    </GluestackUIProvider>
  );
}
