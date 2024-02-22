import { palette } from "@/constants/Colors";
import { TransactionType } from "@/types/TransactionTypes";

export const getTransactionColor = (type: TransactionType) => {
  switch (type) {
    case "expense":
      return palette.red[100];
    case "income":
      return palette.green[100];
    case "transfer":
      return palette.yellow[100];
  }
};
