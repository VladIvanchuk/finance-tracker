import { StyleSheet } from "react-native";
import React from "react";
import {
  Box,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
} from "@gluestack-ui/themed";

interface ThemedActionSheetProps {
  handleClose: () => void;
  showActionSheet: boolean;
  actionSheetItems: React.ReactNode;
  maxHeight?: number;
}

const ThemedActionSheet = ({
  handleClose,
  showActionSheet,
  actionSheetItems,
  maxHeight = 180,
}: ThemedActionSheetProps) => {
  return (
    <Box>
      <Actionsheet isOpen={showActionSheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999} style={{ maxHeight: maxHeight }}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {actionSheetItems}
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default ThemedActionSheet;
