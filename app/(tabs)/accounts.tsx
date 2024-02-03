import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/ui/Header";
import ThemedText from "@/components/ui/ThemedText";

const Wallet = () => {
  return (
    <View style={styles.page_container}>
      <ThemedText>Hi</ThemedText>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  page_container: {
    paddingHorizontal: 4,
  },
});
