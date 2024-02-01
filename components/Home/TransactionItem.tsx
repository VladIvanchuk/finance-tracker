import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors, { palette } from "@/constants/Colors";
import ThemedText from "../ui/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TransactionItem = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: palette.blue[20] }]}>
        <MaterialCommunityIcons
          name="shopping"
          size={28}
          color={palette.blue[100]}
        />
      </View>
      <View style={styles.info_container}>
        <View style={styles.text_container}>
          <ThemedText style={styles.name}>Shopping</ThemedText>
          <ThemedText style={styles.desc}>Buy some grocery</ThemedText>
        </View>
        <View style={styles.text_container}>
          <ThemedText style={styles.price}>120.34 $</ThemedText>
          <ThemedText style={styles.account}>Mono</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tintDark,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 10,
    flexDirection: "row",
  },
  icon: {
    padding: 10,
    borderRadius: 16,
  },
  text_container: {
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  desc: {
    fontSize: 13,
    fontWeight: "400",
  },
  account: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },
  info_container: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
});
