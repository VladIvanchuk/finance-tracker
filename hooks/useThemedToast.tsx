import ThemedToast from "@/components/ui/ThemedToast";
import { useToast } from "@gluestack-ui/themed";
import React from "react";

const useThemedToast = (onCloseComplete?: () => void) => {
  const toast = useToast();

  const showToast = (
    title: string,
    message: string,
    action?: "warning" | "error" | "success" | "info" | "attention"
  ) => {
    toast.closeAll();
    toast.show({
      placement: "top",
      onCloseComplete: onCloseComplete,
      render: ({ id }) => (
        <ThemedToast id={id} title={title} message={message} action={action} />
      ),
    });
  };

  return showToast;
};

export default useThemedToast;
