import { OperationItem, OperationType } from "@/types/OperationTypes";
import incomeCategoryItems from "@/mock/incomeCategoryItems.json";
import expenseCategoryItems from "@/mock/expenseCategoryItems.json";
import { AccountItem } from "@/types/AccountTypes";
import { useQuery } from "@realm/react";
import { Account } from "@/models/Account";
import { currencies } from "@/data/currencies";
import { accountTypes } from "@/data/accountTypes";

const mapToSelectItems = (items: string[]) =>
  items.map((item: string) => ({
    label: item,
    value: item,
  }));

const currencyItems = mapToSelectItems(currencies);
const accountTypeItems = mapToSelectItems(accountTypes);

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
  operationType: OperationType | "account",
): OperationItem[] | AccountItem[] => {
  const accounts = useQuery(Account);

  const accountItems = accounts.map((account) => ({
    label: account.name,
    value: account._id.toString(),
  }));

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
      },
    );
  }

  return items;
};
