import Colors from "@/constants/Colors";
import { Input, InputField } from "@gluestack-ui/themed";
import React from "react";
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  StyleSheet,
} from "react-native";

interface ThemedInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  defaultValue?: string;
  type?: "text" | "password";
}

const ThemedInput = ({
  placeholder,
  onChange,
  keyboardType,
  defaultValue,
  type,
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
          type={type}
          placeholder={placeholder}
          style={styles.input}
          onChangeText={onChange}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
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
