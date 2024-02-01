import { StyleSheet } from "react-native";
import React from "react";
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

interface ThemedAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  onClose: () => void;
}

const ThemedAlert = ({
  visible,
  title,
  message,
  onClose,
}: ThemedAlertProps) => {
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
          <ButtonGroup space="lg">
            <Button variant="outline" action="secondary" onPress={onClose}>
              <ButtonText>Ok</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ThemedAlert;

const styles = StyleSheet.create({});
