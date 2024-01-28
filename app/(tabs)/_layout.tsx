import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";
import TabBarMenu from "@/components/TabBarMenu";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabIconSelected,
          tabBarInactiveTintColor: Colors.tabIconDefault,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          headerStyle: styles.header,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            // headerRight: () => (
            //   <Link href="/modal" asChild>
            //     <Pressable>
            //       {({ pressed }) => (
            //         <Ionicons
            //           name="notifications"
            //           size={25}
            //           color={Colors.text}
            //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            //         />
            //       )}
            //     </Pressable>
            //   </Link>
            // ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Statistics",
            tabBarIcon: ({ color }) => (
              <View style={{ marginRight: 35 }}>
                <TabBarIcon name="stats-chart" color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => (
              <View style={{ marginLeft: 35 }}>
                <TabBarIcon name="wallet" color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="person" color={color} />
            ),
          }}
        />
      </Tabs>
      <TabBarMenu />
    </View>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: 65,
    backgroundColor: Colors.tabBarColor,
  },
  header: {
    backgroundColor: Colors.tabBarColor,
  },
});
