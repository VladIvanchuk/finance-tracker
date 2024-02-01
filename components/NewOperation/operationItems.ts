import { OperationItem, OperationType } from "@/types/Operations";

const incomeCategoryItems = [
  { label: "Salary", value: "salary" },
  { label: "Passive Income", value: "passiveIncome" },
  { label: "Bonuses", value: "bonuses" },
  { label: "Gifts", value: "gifts" },
];

const expenseCategoryItems = [
  { label: "Subscription", value: "subscription" },
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Housing", value: "housing" },
  { label: "Utilities", value: "utilities" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Education", value: "Education" },
  { label: "Debt Payments", value: "Debt Payments" },
  { label: "Savings & Investments", value: "Savings & Investments" },
  { label: "Gifts & Donations", value: "Gifts & Donations" },
  { label: "Travel", value: "Travel" },
  {
    label: "Subscriptions & Memberships",
    value: "Subscriptions & Memberships",
  },
  { label: "Taxes", value: "Taxes" },
];

const currencyItems = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "UAH", value: "UAH" },
];

const accountItems = [
  { label: "Cash", value: "0" },
  { label: "Monobank", value: "9" },
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

export const getOperationItems = (operationType: OperationType) => {
  const categoryItems =
    operationType === "income" ? incomeCategoryItems : expenseCategoryItems;

  return operationItems.map((item) => {
    if (item.type === "category") {
      return { ...item, items: categoryItems };
    }
    return item;
  });
};
