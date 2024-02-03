import { StyleSheet } from "react-native";
import React, { ReactElement } from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
} from "@gluestack-ui/themed";
import ThemedButton from "./ThemedButton";

type ThemedAlertType = "delete" | "exit" | "info";

interface ThemedAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  onClose: () => void;
  buttons?: ReactElement | ReactElement[];
  type?: ThemedAlertType;
  action?: () => void;
}

const ThemedAlert = ({
  visible,
  title,
  message,
  onClose,
  buttons,
  type = "info",
  action,
}: ThemedAlertProps) => {
  const handleAction = () => {
    action?.();
    onClose();
  };
  const renderButtons = () => {
    if (React.isValidElement(buttons) || Array.isArray(buttons)) {
      return buttons;
    }
    switch (type) {
      case "info":
        return <ThemedButton action="secondary" onPress={onClose} label="Ok" />;
      case "exit":
        return (
          <>
            <ThemedButton action="secondary" onPress={onClose} label="Cancel" />
            <ThemedButton
              action="negative"
              onPress={handleAction}
              label="Exit"
            />
          </>
        );
      case "delete":
        return (
          <>
            <ThemedButton action="secondary" onPress={onClose} label="Cancel" />
            <ThemedButton
              action="negative"
              onPress={handleAction}
              label="Delete"
            />
          </>
        );
    }
  };
  return (
    <AlertDialog isOpen={visible} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent
        style={{ shadowColor: "transparent", elevation: 0 }}
        borderRadius={14}
      >
        <AlertDialogHeader>
          <Heading size="lg">{title}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        {message && (
          <AlertDialogBody>
            <Text size="sm">{message}</Text>
          </AlertDialogBody>
        )}
        <AlertDialogFooter>
          <ButtonGroup space="lg">{renderButtons()}</ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ThemedAlert;

const styles = StyleSheet.create({});
