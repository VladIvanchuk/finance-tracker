import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";

interface AttachmentProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const Attachment = ({}: AttachmentProps) => {
  return (
    <Pressable style={styles.input_container}>
      <Entypo name="attachment" size={24} color={Colors.text} />
      <Text style={styles.text}>Add attachment</Text>
    </Pressable>
  );
};

export default Attachment;

const styles = StyleSheet.create({
  input_container: {
    borderRadius: 16,
    paddingRight: 12,
    borderColor: Colors.border,
    borderWidth: 1,
    borderStyle: "dashed",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
});
