import { accountTypes } from "@/data/accountTypes";
import { currencies } from "@/data/currencies";
import { Account } from "@/schemas/Account";
import { Category } from "@/schemas/Category";
import { AccountItem } from "@/types/AccountTypes";
import { OperationItem, OperationType } from "@/types/OperationTypes";
import { useQuery } from "@realm/react";

const mapToSelectItems = (items: string[]) =>
  items.map((item: string) => ({
    label: item,
    value: item,
  }));

const currencyItems = mapToSelectItems(currencies);
const accountTypeItems = mapToSelectItems(accountTypes);

export const operationFields: OperationItem[] = [
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

export const useOperationItems = (operationType: OperationType | "account") => {
  const accounts = useQuery(Account);
  const categories = useQuery(Category);

  const accountItems = accounts.map((account) => ({
    label: account.name,
    value: account._id.toString(),
  }));

  const incomeCategoryItems = categories
    .filter((category) => category.type === "income")
    .map((category) => ({
      label: category.name,
      value: category._id,
    }));

  const expenseCategoryItems = categories
    .filter((category) => category.type === "expense")
    .map((category) => ({
      label: category.name,
      value: category._id.toString(),
    }));

  const items =
    operationType !== "account" ? [...operationFields] : [...accountFields];

  if (operationType === "transfer") {
    items.splice(0, 0, {
      id: "transferAccounts",
      type: "transferAccounts",
      items: accountItems,
    });
  } else if (operationType !== "account") {
    const categoryItems =
      operationType === "income" ? incomeCategoryItems : expenseCategoryItems;
    items.splice(
      1,
      0,
      {
        id: "categoryId",
        type: "categoryId",
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
