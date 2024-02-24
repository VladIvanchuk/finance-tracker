import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@gluestack-ui/themed";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface ThemedActionSheetProps {
  handleClose: () => void;
  showActionSheet: boolean;
  actionSheetItems: React.ReactNode;
  maxHeight?: number;
  height?: number | string;
}

const ThemedActionSheet = ({
  handleClose,
  showActionSheet,
  actionSheetItems,
  maxHeight = 130,
  height,
}: ThemedActionSheetProps) => {
  const contentStyle: StyleProp<ViewStyle> = {
    maxHeight: maxHeight,
    ...(height ? { height: height } : {}),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  return (
    <>
      <Actionsheet isOpen={showActionSheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999} style={contentStyle}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {actionSheetItems}
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default ThemedActionSheet;
