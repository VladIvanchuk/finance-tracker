import { AccountItemType, IAccount } from "@/types/AccountTypes";
import { OperationItemType } from "@/types/OperationTypes";
import { ITransaction } from "@/types/TransactionTypes";
import { ObjectId } from "bson";
import { router } from "expo-router";
import React from "react";
import ThemedInput from "../ui/ThemedInput";
import ThemedSelect from "../ui/ThemedSelect";
import Attachment from "./Attachment";
import TransferAccounts from "./TransferAccounts";
import ChooseDate from "./ChooseDate";

interface NewOperationBodyItemProps {
  id: string;
  type: OperationItemType | AccountItemType;
  items?: { label: string; value: string | ObjectId }[];
  onChange: (value: string, type?: OperationItemType) => void;
  operation: ITransaction | IAccount;
}

const NewOperationBodyItem = ({
  type,
  onChange,
  items,
  operation,
}: NewOperationBodyItemProps) => {
  if (operation.type === "transfer" && type === "transferAccounts") {
    return (
      <TransferAccounts
        onChange={onChange}
        items={items}
        operation={operation as ITransaction}
      />
    );
  }

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
      return (
        <ThemedSelect
          placeholder={`Select category`}
          items={items}
          onChange={onChange}
          addButtonAction={() => router.replace("/addAccount")}
        />
      );
    case "account":
    case "type":
      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
          addButtonAction={() => router.replace("/addAccount")}
        />
      );
    case "description":
      return <ThemedInput placeholder={`Description`} onChange={onChange} />;
    case "name":
      return (
        <ThemedInput
          placeholder={`Account name`}
          onChange={onChange}
          keyboardType="numeric"
        />
      );
    case "bankName":
      return <ThemedInput placeholder={`Bank name`} onChange={onChange} />;
    case "accountNumber":
      return <ThemedInput placeholder={`Account number`} onChange={onChange} />;
    case "notes":
      return <ThemedInput placeholder={`Notes`} onChange={onChange} />;
    case "attachment":
      return <Attachment onChange={onChange} />;
    case "date":
      return <ChooseDate onChange={onChange} />;
  }
  return null;
};

export default NewOperationBodyItem;
