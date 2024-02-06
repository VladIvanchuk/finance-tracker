import { KeyboardAvoidingView, KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Input, InputField } from "@gluestack-ui/themed";

interface ThemedInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const ThemedInput = ({
  placeholder,
  onChange,
  keyboardType,
}: ThemedInputProps) => {
  return (
    <KeyboardAvoidingView>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={styles.input_container}
      >
        <InputField
          placeholder={placeholder}
          style={styles.input}
          onChangeText={onChange}
          keyboardType={keyboardType}
        />
      </Input>
    </KeyboardAvoidingView>
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  input_container: {
    borderRadius: 16,
    paddingRight: 12,
    borderColor: Colors.border,
    height: 60,
  },
  input: {
    fontSize: 18,
  },
});
