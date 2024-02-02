import { StyleSheet, View } from "react-native";
import Colors, { palette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import MonthPicker from "./MonthPicker";

const Greeting = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <AntDesign name="dingding-o" size={34} color={Colors.tint} />
        <MonthPicker />
        <View style={styles.icon}>
          <Fontisto name="bell-alt" size={20} color={Colors.background} />
        </View>
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
    paddingHorizontal: 14,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  text: { fontSize: 24, fontWeight: "800" },
  icon: {
    backgroundColor: palette.light[20],
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
