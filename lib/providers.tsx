import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { RealmProvider } from "@realm/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RealmProvider>
      <GluestackUIProvider config={config} colorMode="dark">
        <ThemeProvider value={DarkTheme}>{children}</ThemeProvider>
      </GluestackUIProvider>
    </RealmProvider>
  );
};

export default Providers;

const styles = StyleSheet.create({});
