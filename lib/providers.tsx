import { StyleSheet } from "react-native";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { RealmProvider } from "@realm/react";
import { Account } from "@/models/Account";
import { Transaction } from "@/models/Transaction";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RealmProvider schema={[Account, Transaction]}>
      <GluestackUIProvider config={config} colorMode="dark">
        <ThemeProvider value={DarkTheme}>{children}</ThemeProvider>
      </GluestackUIProvider>
    </RealmProvider>
  );
};

export default Providers;

const styles = StyleSheet.create({});
