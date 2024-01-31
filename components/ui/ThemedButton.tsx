import { StyleSheet } from "react-native";
import React from "react";
import { ButtonText, Button } from "@gluestack-ui/themed";

const ThemedButton = () => {
  return (
    <Button
      size="md"
      variant="solid"
      action="primary"
      isDisabled={false}
      isFocusVisible={false}
      bg="$cyan900"
      borderRadius="$xl"
    >
      <ButtonText>Continue</ButtonText>
    </Button>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({});
