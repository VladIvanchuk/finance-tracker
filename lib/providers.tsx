import "react-native-get-random-values";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { RealmProvider } from "@realm/react";
import { realmConfig } from "./realm";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RealmProvider {...realmConfig}>
      <GluestackUIProvider config={config} colorMode="dark">
        <ThemeProvider value={DarkTheme}>{children}</ThemeProvider>
      </GluestackUIProvider>
    </RealmProvider>
  );
};

export default Providers;
