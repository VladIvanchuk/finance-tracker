import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "../ui/ThemedText";

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
}

const MenuItem = ({ label, icon }: MenuItemProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      {icon}
      <ThemedText style={styles.text}>{label}</ThemedText>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tintDark,
    height: 54,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
