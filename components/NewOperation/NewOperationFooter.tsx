import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors, { palette } from "@/constants/Colors";

const NewOperationFooter = () => {
  return (
    <View style={styles.footer_container}>
      <Text>NewOperationFooter</Text>
    </View>
  );
};

export default NewOperationFooter;

const styles = StyleSheet.create({
  footer_container: {
    height: 88,
    padding: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderColor: palette.light[100],
  },
});
