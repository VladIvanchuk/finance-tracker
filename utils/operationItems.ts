import { OperationItem, OperationType } from "@/types/Operations";

import incomeCategoryItems from "@/mock/incomeCategoryItems.json";
import expenseCategoryItems from "@/mock/expenseCategoryItems.json";
import currencyItems from "@/mock/InputCurrenciesItems.json";
import accountItems from "@/mock/InputAccountItems.json";

const operationItems: OperationItem[] = [
  {
    id: "currency",
    type: "currency",
    items: currencyItems,
  },
  {
    id: "Description",
    type: "description",
  },
  {
    id: "attachment",
    type: "attachment",
  },
];

export default operationItems;

export const getOperationItems = (
  operationType: OperationType,
): OperationItem[] => {
  let items = [...operationItems];

  if (operationType === "transfer") {
    items.splice(0, 0, {
      id: "transferAccounts",
      type: "transferAccounts",
      items: accountItems,
    });
  } else {
    const categoryItems =
      operationType === "income" ? incomeCategoryItems : expenseCategoryItems;
    items.splice(
      1,
      0,
      {
        id: "category",
        type: "category",
        items: categoryItems,
      },
      {
        id: "account",
        type: "account",
        items: accountItems,
      },
    );
  }

  return items;
};
