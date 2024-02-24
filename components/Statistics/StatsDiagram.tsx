import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

const StatsDiagram = () => {
  return <View style={styles.container}></View>;
};

export default StatsDiagram;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.tabBarColor,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 15,
  },
});
