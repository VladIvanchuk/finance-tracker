import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Switch } from "@gluestack-ui/themed";
import Colors from "@/constants/Colors";

interface RepeatProps {
  onChange: (value: boolean) => void;
}
const Repeat = ({ onChange }: RepeatProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    onChange(newIsChecked);
  };
  return (
    <View style={styles.repeat_container}>
      <View style={styles.text_container}>
        <Text style={styles.text_main}>Repeat</Text>
        <Text style={styles.description}>Repeat transaction</Text>
      </View>
      <Switch onToggle={toggleSwitch} value={isChecked} />
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
