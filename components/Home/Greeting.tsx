import { StyleSheet, View } from "react-native";
import React from "react";
import ThemedText from "../ui/ThemedText";
import Colors, { palette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const Greeting = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <AntDesign name="dingding-o" size={34} color={Colors.tint} />
        <ThemedText style={styles.text}>Hey George!</ThemedText>
      </View>
      <View style={styles.icon}>
        <Fontisto name="bell-alt" size={20} color={Colors.background} />
      </View>
    </View>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  container: { flexDirection: "row", alignItems: "center", gap: 8 },
  text: { fontSize: 24, fontWeight: "800" },
  icon: {
    backgroundColor: palette.light[20],
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
