import React from "react";
import { ButtonText, Button, View } from "@gluestack-ui/themed";

interface ThemedButtonProps {
  label: string;
  style?: {};
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  bg?: string;
  onPress?: () => void;
  isDisabled?: boolean;
}

const ThemedButton = ({
  label,
  style,
  size,
  bg,
  onPress,
  isDisabled,
}: ThemedButtonProps) => {
  return (
    <View style={style}>
      <Button
        size={size ?? "md"}
        variant="solid"
        action="primary"
        isDisabled={isDisabled}
        isFocusVisible={false}
        bg={bg ?? "$blue600"}
        borderRadius="$xl"
        onPress={onPress}
      >
        <ButtonText>{label}</ButtonText>
      </Button>
    </View>
  );
};

export default ThemedButton;
