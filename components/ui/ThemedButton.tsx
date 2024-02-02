import React from "react";
import { ButtonText, Button, View } from "@gluestack-ui/themed";

interface ThemedButtonProps {
  label: string;
  style?: {};
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  bg?: string;
  onPress?: () => void;
  isDisabled?: boolean;
  action?: "primary" | "secondary" | "positive" | "negative" | "default";
}

const ThemedButton = ({
  label,
  style,
  size,
  bg,
  onPress,
  isDisabled,
  action,
}: ThemedButtonProps) => {
  return (
    <View style={style}>
      <Button
        size={size ?? "md"}
        variant="solid"
        action={action}
        isDisabled={isDisabled}
        isFocusVisible={false}
        bg={!action && !bg ? "$blue600" : undefined}
        borderRadius="$xl"
        onPress={onPress}
      >
        <ButtonText>{label}</ButtonText>
      </Button>
    </View>
  );
};

export default ThemedButton;
