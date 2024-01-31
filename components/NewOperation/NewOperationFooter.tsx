import { StyleSheet, View } from "react-native";
import React from "react";
import Colors, { palette } from "@/constants/Colors";
import ThemedButton from "../ui/ThemedButton";

const NewOperationFooter = () => {
  return (
    <View style={styles.footer_container}>
      <ThemedButton />
    </View>
  );
};

export default NewOperationFooter;

const styles = StyleSheet.create({
  footer_container: {
    height: 80,
    padding: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderColor: palette.light[20],
  },
  footer_button: {
    backgroundColor: Colors.tint,
  },
});
