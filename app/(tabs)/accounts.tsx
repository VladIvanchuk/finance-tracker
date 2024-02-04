import { StyleSheet, View } from "react-native";
import React from "react";
import AccountCards from "@/components/Accounts/AccountCards";

const Accounts = () => {
  return (
    <View style={styles.page_container}>
      <AccountCards />
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  page_container: {},
});
