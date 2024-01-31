import { OperationItem } from "@/types/Operations";

const incomeCategoryItems = [{ label: "Salary", value: "salary" }];
const expenseCategoryItems = [
  { label: "Shopping", value: "shopping" },
  { label: "Subscription", value: "subscription" },
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
];

const currencyItems = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "UAH", value: "UAH" },
];

const accountItems = [
  { label: "Monobank", value: "768686" },
  { label: "Cash", value: "cash" },
];

const operationItems: OperationItem[] = [
  {
    id: "Description",
    type: "description",
  },
  {
    id: "category",
    type: "category",
    items: expenseCategoryItems,
  },

  {
    id: "account",
    type: "account",
    items: accountItems,
  },
  {
    id: "currency",
    type: "currency",
    items: currencyItems,
  },
  {
    id: "attachment",
    type: "attachment",
  },
  {
    id: "repeat",
    type: "repeat",
  },
];

export default operationItems;
