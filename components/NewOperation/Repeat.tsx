import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Switch } from "@gluestack-ui/themed";
import Colors from "@/constants/Colors";

interface RepeatProps {
  onChange: (value: string) => void;
}
const Repeat = ({}: RepeatProps) => {
  return (
    <View style={styles.repeat_container}>
      <View style={styles.text_container}>
        <Text style={styles.text_main}>Repeat</Text>
        <Text style={styles.description}>Repeat transaction</Text>
      </View>
      <Switch />
    </View>
  );
};

export default Repeat;

const styles = StyleSheet.create({
  repeat_container: { height: 60, flexDirection: "row" },
  text_container: { flex: 1 },
  text_main: { fontSize: 16, color: Colors.text, fontWeight: "600" },
  description: { fontSize: 13, color: Colors.text },
});
