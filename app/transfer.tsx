import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { palette } from "@/constants/Colors";

const AddTransfer = () => {
  return (
    <View style={styles.screen_wrapper}>
      <Text>Add</Text>
    </View>
  );
};

export default AddTransfer;

const styles = StyleSheet.create({
  screen_wrapper: {
    flex: 1,
    backgroundColor: palette.yellow[100],
  },
});
