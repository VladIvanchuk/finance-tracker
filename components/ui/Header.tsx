import { StyleSheet, View } from "react-native";
import Colors, { palette } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import ThemedText from "./ThemedText";

interface HeaderProps {
  children?: React.ReactNode;
  title?: string;
}
const Header = ({ children, title }: HeaderProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <AntDesign name="dingding-o" size={34} color={Colors.tint} />
        {children ?? <ThemedText style={styles.title}>{title}</ThemedText>}
        <View style={styles.icon}>
          <Fontisto name="bell-alt" size={20} color={Colors.background} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  icon: {
    backgroundColor: palette.light[20],
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  title: { fontSize: 18, fontWeight: "800", paddingVertical: 6 },
});
