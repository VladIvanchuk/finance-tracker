import { Button, ButtonSpinner, ButtonText, View } from "@gluestack-ui/themed";
import React from "react";

interface ThemedButtonProps {
  label: string;
  style?: object;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  bg?: string;
  onPress?: () => void;
  isDisabled?: boolean;
  action?: "primary" | "secondary" | "positive" | "negative" | "default";
  isLoading?: boolean;
}

const ThemedButton = ({
  label,
  style,
  size,
  bg,
  onPress,
  isDisabled = false,
  isLoading = false,
  action,
}: ThemedButtonProps) => {
  const backgroundColor = action || bg ? bg : "$blue600";

  return (
    <View style={style}>
      <Button
        size={size ?? "md"}
        variant="solid"
        action={action}
        isDisabled={isLoading ?? isDisabled}
        isFocusVisible={false}
        borderRadius="$xl"
        onPress={onPress}
        {...(backgroundColor && { bg: backgroundColor })}
      >
        {isLoading && <ButtonSpinner mr="$1" />}
        <ButtonText>{isLoading ? "Please wait..." : label}</ButtonText>
      </Button>
    </View>
  );
};

export default ThemedButton;
