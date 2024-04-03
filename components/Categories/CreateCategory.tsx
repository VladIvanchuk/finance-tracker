import Colors, { palette } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedInput from "../ui/ThemedInput";
import ThemedText from "../ui/ThemedText";

const CreateCategory = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorOptions = [
    { color: palette.blue[100], id: "blue" },
    { color: palette.green[100], id: "green" },
    { color: palette.red[100], id: "red" },
    { color: palette.violet[100], id: "violet" },
    { color: palette.yellow[100], id: "yellow" },
  ];

  return (
    <View style={styles.container}>
      <ThemedInput
        onChange={() => console.log(true)}
        placeholder="Category name"
      />
      <TouchableOpacity style={styles.icon}>
        <ThemedText style={styles.text}>Select icon</ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.text}>Select color</ThemedText>
      <View style={styles.colors}>
        {colorOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => setSelectedColor(option.id)}
          >
            <View
              style={[
                styles.color,
                { backgroundColor: option.color },
                selectedColor === option.id && styles.selectedColor,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CreateCategory;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    gap: 16,
  },
  text: {
    fontSize: 18,
  },
  colors: {
    flexDirection: "row",
    gap: 16,
  },
  color: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  selectedColor: {
    borderColor: Colors.border,
    borderWidth: 2,
  },
  icon: {
    width: "100%",
    height: 60,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
