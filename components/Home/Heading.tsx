import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Greeting from "./Greeting";
import Balance from "./Balance";

const Heading = () => {
  return (
    <View style={styles.container}>
      <Greeting />
      <Balance />
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
