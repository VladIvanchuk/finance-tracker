import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";

interface ThemedToastProps {
  title: string;
  message?: string;
  action?: "warning" | "error" | "success" | "info" | "attention";
  id?: string | undefined;
}

const ThemedToast = ({ title, message, action, id }: ThemedToastProps) => {
  const toastId = "toast-" + id;
  return (
    <Toast nativeID={toastId} action={action} variant="accent" mt="$10">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </VStack>
    </Toast>
  );
};

export default ThemedToast;
