import { StyleSheet } from "react-native";
import React, { ReactElement } from "react";
import {
  Button,
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
    if (action) {
      action();
    }
    onClose();
  };
  const renderButtons = () => {
    if (React.isValidElement(buttons) || Array.isArray(buttons)) {
      return buttons;
    }
    switch (type) {
      case "info":
        return (
          <Button action="secondary" onPress={onClose}>
            <ButtonText>Ok</ButtonText>
          </Button>
        );
      case "exit":
        return (
          <>
            <Button action="secondary" onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button action="negative" onPress={handleAction}>
              <ButtonText>Exit</ButtonText>
            </Button>
          </>
        );
      case "delete":
        return (
          <>
            <Button action="secondary" onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button bg="$error600" action="negative" onPress={handleAction}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </>
        );
    }
  };
  return (
    <AlertDialog isOpen={visible} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent style={{ shadowColor: "transparent", elevation: 0 }}>
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
