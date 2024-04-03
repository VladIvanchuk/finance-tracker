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
import ThemedCheckbox from "../ui/ThemedCheckbox";

interface NewTransactionBodyItemProps {
  id: string;
  type: TransactionItemType | AccountItemType;
  items?: { label: string; value: string | ObjectId }[];
  onChange: (value: string | boolean, type?: TransactionItemType) => void;
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
  let account;
  let category;

  switch (type) {
    case "categoryId":
      if ("category" in operation && operation.category) {
        category = operation.category;
      }
      return (
        <ThemedSelect
          placeholder={`Select category`}
          items={items}
          onChange={onChange}
          addButtonAction={() => router.replace("/categories")}
          selectedValue={category?._id.toString()}
          initialLabel={category?.name.toString()}
        />
      );

    case "account":
      if ("account" in operation && operation.account) {
        account = operation.account;
      }

      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
          addButtonAction={() => router.replace("/addAccount")}
          selectedValue={account?._id.toString()}
          initialLabel={account?.name.toString()}
        />
      );
    case "type":
      if ("type" in operation) {
        return (
          <ThemedSelect
            placeholder={`Select ${type}`}
            items={items}
            onChange={onChange}
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
    case "disregard":
      if ("disregard" in operation) {
        return (
          <ThemedCheckbox
            label={`Ignore in the total balance`}
            onChange={onChange}
            value={"string"}
            defaultIsChecked={operation.disregard}
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
