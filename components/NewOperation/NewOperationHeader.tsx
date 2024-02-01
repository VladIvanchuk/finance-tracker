import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedText from "../ui/ThemedText";
import Colors from "@/constants/Colors";
import { IOperation, OperationType } from "@/types/Operations";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";

const NewOperationHeader = ({
  setOperation,
  operation,
}: {
  operation: IOperation;
  setOperation: React.Dispatch<React.SetStateAction<IOperation>>;
}) => {
  const [number, onChangeNumber] = useState("");

  useEffect(() => {
    setOperation((prev) => ({ ...prev, value: number }));
  }, [number, setOperation]);

  return (
    <View style={styles.header_container}>
      <ThemedText style={{ fontWeight: "bold", fontSize: 18, opacity: 0.8 }}>
        How much?
      </ThemedText>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor={Colors.text}
        />
        <ThemedText style={{ fontWeight: "bold", fontSize: 64 }}>
          {getCurrencySymbol(operation.currency)}
        </ThemedText>
      </View>
    </View>
  );
};

export default NewOperationHeader;

const styles = StyleSheet.create({
  header_container: {
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 64,
    color: Colors.text,
  },
});
