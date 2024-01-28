import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { palette } from "@/constants/Colors";

const AddExpense = () => {
  return (
    <View style={styles.screen_wrapper}>
      <Text>expense</Text>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  screen_wrapper: {
    flex: 1,
    backgroundColor: palette.red[100],
  },
});
