import { palette } from "@/constants/Colors";
import { OperationType } from "@/types/Operations";

export const getOperationColor = (type: OperationType) => {
  switch (type) {
    case "expense":
      return palette.red[100];
    case "income":
      return palette.green[100];
    case "transfer":
      return palette.yellow[100];
  }
};
