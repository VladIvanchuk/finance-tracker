import { accountTypes } from "@/data/accountTypes";
import { Account } from "@/schemas/Account";
import { Category } from "@/schemas/Category";
import { AccountItem, IAccount } from "@/types/AccountTypes";
import {
  ITransaction,
  TransactionItem,
  TransactionType,
} from "@/types/TransactionTypes";
import { useQuery } from "@realm/react";

const mapToSelectItems = (items: string[]) =>
  items.map((item: string) => ({
    label: item,
    value: item,
  }));

const accountTypeItems = mapToSelectItems(accountTypes);

type Item = TransactionItem | AccountItem;

export const operationFields: TransactionItem[] = [
  {
    id: "Description",
    type: "description",
  },
  {
    id: "attachment",
    type: "attachment",
  },
  {
    id: "date",
    type: "date",
  },
];
export const accountFields: AccountItem[] = [
  {
    id: "name",
    type: "name",
  },
  {
    id: "type",
    type: "type",
    items: accountTypeItems,
  },
  {
    id: "notes",
    type: "notes",
  },
];

export const useTransactionItems = (
  operationType: TransactionType | "account",
  operation: ITransaction | IAccount,
) => {
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

  let items: Item[] =
    operationType !== "account" ? [...operationFields] : [...accountFields];

  if (operationType === "account") {
    if (operation.type !== "Cash") {
      items = items.concat([
        {
          id: "bankName",
          type: "bankName",
        },
        {
          id: "accountNumber",
          type: "accountNumber",
        },
      ]);
    }
    items.push({
      id: "disregard",
      type: "disregard",
    });
  }

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
      },
    );
  }

  return items;
};
