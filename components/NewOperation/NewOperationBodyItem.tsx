import React from "react";
import ThemedSelect from "../ui/ThemedSelect";
import { IOperation, OperationItemType } from "@/types/Operations";
import ThemedInput from "../ui/ThemedInput";
import Attachment from "./Attachment";
import TransferAccounts from "./TransferAccounts";
import { AccountItemType, IAccount } from "@/types/Accounts";

interface NewOperationBodyItemProps {
  id: string;
  type: OperationItemType | AccountItemType;
  items?: { label: string; value: string }[];
  onChange: (value: string, type?: OperationItemType) => void;
  operation: IOperation | IAccount;
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
        operation={operation as IOperation}
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
    case "category":
    case "account":
    case "type":
      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
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
  }
  return null;
};

export default NewOperationBodyItem;
