import { AnonymousLogIn } from "@/components/AnonymousLogIn";
import { theme } from "@/constants/theme";
import { DatabaseProvider } from "@/context/DatabaseContext";
import { MonthProvider } from "@/context/MonthContext";
import schemas from "@/schemas/schemas";
import { appId } from "@/services/authService";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { ThemeProvider } from "@react-navigation/native";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider id={appId}>
      <UserProvider fallback={<AnonymousLogIn />}>
        <RealmProvider schema={schemas} sync={{ flexible: true }}>
          <DatabaseProvider>
            <GluestackUIProvider config={config} colorMode="dark">
              <ThemeProvider value={theme}>
                <MonthProvider>{children}</MonthProvider>
              </ThemeProvider>
            </GluestackUIProvider>
          </DatabaseProvider>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default Providers;
