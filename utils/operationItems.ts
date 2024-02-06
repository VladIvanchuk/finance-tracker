import { OperationItem, OperationType } from "@/types/Operations";

import incomeCategoryItems from "@/mock/incomeCategoryItems.json";
import expenseCategoryItems from "@/mock/expenseCategoryItems.json";
import currencyItems from "@/mock/InputCurrenciesItems.json";
import accountItems from "@/mock/InputAccountItems.json";
import accountTypeItems from "@/mock/accountTypeItems.json";
import { AccountItem } from "@/types/Accounts";

export const operationFields: OperationItem[] = [
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
export const accountFields: AccountItem[] = [
  {
    id: "name",
    type: "name",
  },
  {
    id: "currency",
    type: "currency",
    items: currencyItems,
  },
  {
    id: "type",
    type: "type",
    items: accountTypeItems,
  },
  {
    id: "bankName",
    type: "bankName",
  },
  {
    id: "accountNumber",
    type: "accountNumber",
  },
  {
    id: "notes",
    type: "notes",
  },
];

export const getOperationItems = (
  operationType: OperationType | "account"
): OperationItem[] | AccountItem[] => {
  let items =
    operationType !== "account" ? [...operationFields] : [...accountFields];

  if (operationType === "transfer") {
    items.splice(0, 0, {
      id: "transferAccounts",
      type: "transferAccounts",
      items: accountItems,
    });
  } else if (operationType === "account") {
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
      }
    );
  }

  return items;
};
