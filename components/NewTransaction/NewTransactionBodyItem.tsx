import { AccountItemType, IAccount } from "@/types/AccountTypes";
import { TransactionData, TransactionItemType } from "@/types/TransactionTypes";
import { ITransaction } from "@/types/TransactionTypes";
import { ObjectId } from "bson";
import { router } from "expo-router";
import React from "react";
import ThemedInput from "../ui/ThemedInput";
import ThemedSelect from "../ui/ThemedSelect";
import Attachment from "./Attachment";
import TransferAccounts from "./TransferAccounts";
import ChooseDate from "./ChooseDate";

interface NewTransactionBodyItemProps {
  id: string;
  type: TransactionItemType | AccountItemType;
  items?: { label: string; value: string | ObjectId }[];
  onChange: (value: string, type?: TransactionItemType) => void;
  operation: TransactionData | IAccount | ITransaction;
}

const NewTransactionBodyItem = ({
  type,
  onChange,
  items,
  operation,
}: NewTransactionBodyItemProps) => {
  if (operation.type === "transfer" && type === "transferAccounts") {
    return (
      <TransferAccounts
        onChange={onChange}
        items={items}
        operation={operation as ITransaction}
      />
    );
  }
  let accountName;
  let categoryName;

  switch (type) {
    case "currency":
      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
          defaultValue={operation.currency}
        />
      );
    case "categoryId":
      if ("category" in operation && operation.category) {
        categoryName = operation.category.name;
      }
      return (
        <ThemedSelect
          placeholder={`Select category`}
          items={items}
          onChange={onChange}
          addButtonAction={() => router.replace("/addAccount")}
          defaultValue={categoryName}
        />
      );

    case "account":
      if ("account" in operation && operation.account) {
        accountName = operation.account.name;
      }

      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
          addButtonAction={() => router.replace("/addAccount")}
          defaultValue={accountName}
        />
      );
    case "type":
      if ("type" in operation) {
        return (
          <ThemedSelect
            placeholder={`Select ${type}`}
            items={items}
            onChange={onChange}
            addButtonAction={() => router.replace("/addAccount")}
            defaultValue={operation.type}
          />
        );
      }
      return null;
    case "description":
      if ("description" in operation) {
        return (
          <ThemedInput
            placeholder={`Description`}
            onChange={onChange}
            defaultValue={operation.description}
          />
        );
      }
      return null;
    case "name":
      if ("name" in operation) {
        return (
          <ThemedInput
            placeholder={`Account name`}
            onChange={onChange}
            defaultValue={operation.name}
          />
        );
      }
      return null;
    case "bankName":
      if ("bankName" in operation) {
        return (
          <ThemedInput
            placeholder={`Bank name`}
            onChange={onChange}
            defaultValue={operation.bankName}
          />
        );
      }
      return null;
    case "accountNumber":
      if ("accountNumber" in operation) {
        return (
          <ThemedInput
            placeholder={`Account number`}
            onChange={onChange}
            defaultValue={operation.accountNumber}
          />
        );
      }
      return null;
    case "notes":
      if ("notes" in operation) {
        return (
          <ThemedInput
            placeholder={`Notes`}
            onChange={onChange}
            defaultValue={operation.notes}
          />
        );
      }
      return null;
    case "attachment":
      return <Attachment onChange={onChange} />;
    case "date":
      if ("date" in operation) {
        return <ChooseDate onChange={onChange} defaultValue={operation.date} />;
      }
      return null;
  }
  return null;
};

export default NewTransactionBodyItem;
