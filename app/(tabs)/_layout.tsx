import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

import Colors from "@/constants/Colors";
import TabBarMenu from "@/components/TabBar/TabBarMenu";
import Header from "@/components/ui/Header";
import MonthPicker from "@/components/Home/MonthPicker";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.tabIconSelected,
          tabBarInactiveTintColor: Colors.tabIconDefault,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          headerStyle: styles.header,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            header: () => (
              <Header>
                <MonthPicker />
              </Header>
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ marginRight: 35 }}>
                <TabBarIcon name="pie-chart" color={color} />
              </View>
            ),
            header: () => <Header title="Statistics" />,
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ marginLeft: 35 }}>
                <TabBarIcon name="wallet" color={color} />
              </View>
            ),
            header: () => <Header title="Accounts" />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="person" color={color} />
            ),
            header: () => <Header title="Profile" />,
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
