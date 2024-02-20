import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { RealmProvider } from "@realm/react";
import { realmConfig } from "../schemas/realm";
import { DatabaseProvider } from "@/context/DatabaseContext";
import { MonthProvider } from "@/context/MonthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RealmProvider {...realmConfig}>
      <DatabaseProvider>
        <GluestackUIProvider config={config} colorMode="dark">
          <ThemeProvider value={DarkTheme}>
            <MonthProvider>{children}</MonthProvider>
          </ThemeProvider>
        </GluestackUIProvider>
      </DatabaseProvider>
    </RealmProvider>
  );
};

export default Providers;
