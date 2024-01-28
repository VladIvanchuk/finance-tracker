import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface ThemedTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const ThemedText: React.FC<ThemedTextProps> = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default ThemedText;

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
  },
});
