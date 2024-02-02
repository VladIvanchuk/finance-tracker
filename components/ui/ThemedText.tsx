import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface ThemedTextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: "middle" | "head" | "tail" | "clip" | undefined;
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  style,
  numberOfLines,
  ellipsizeMode,
}) => {
  return (
    <Text
      style={[styles.text, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
  },
});
