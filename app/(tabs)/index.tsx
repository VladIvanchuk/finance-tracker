import React from "react";
import { StyleSheet, View } from "react-native";
import Heading from "@/components/Home/Heading";
import TransactionsHistory from "@/components/Home/TransactionsHistory";

const Home = () => {
  return (
    <View style={styles.page_container}>
      <Heading />
      <TransactionsHistory />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page_container: {
    paddingHorizontal: 8,
    paddingTop: 64,
  },
});
