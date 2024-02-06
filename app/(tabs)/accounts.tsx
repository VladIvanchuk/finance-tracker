import { StyleSheet, View } from "react-native";
import React from "react";
import AccountCards from "@/components/Accounts/AccountCards";
import AccountsHeader from "@/components/Accounts/AccountsHeader";

const Accounts = () => {
  return (
    <View style={styles.page_container}>
      <AccountsHeader />
      <AccountCards />
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  page_container: { paddingTop: 16 },
});
