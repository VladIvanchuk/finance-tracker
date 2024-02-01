import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";

interface ThemedToastProps {
  title: string;
  message?: string;
  action?: "warning" | "error" | "success" | "info" | "attention";
  id?: string | undefined;
}

const ThemedToast = ({ title, message, action, id }: ThemedToastProps) => {
  const toastId = "toast-" + id;
  return (
    <Toast nativeID={toastId} action={action} variant="accent" mt="$10" onClose>
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </VStack>
    </Toast>
  );
};

export default ThemedToast;

const styles = StyleSheet.create({});
