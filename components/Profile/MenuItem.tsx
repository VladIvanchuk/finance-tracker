import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "../ui/ThemedText";
import { useRouter } from "expo-router";

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onPress?: () => void;
}

const MenuItem = ({ label, icon, href, onPress }: MenuItemProps) => {
  const router = useRouter();

  const handleLinkPress = () => {
    router.navigate({ pathname: href });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress ?? handleLinkPress}
    >
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
