import React from "react";
import ThemedSelect from "../ui/ThemedSelect";
import { IOperation, OperationItemType } from "@/types/Operations";
import ThemedInput from "../ui/ThemedInput";
import Attachment from "./Attachment";
import TransferAccounts from "./TransferAccounts";

interface NewOperationBodyItemProps {
  id: string;
  type: OperationItemType;
  items?: { label: string; value: string }[];
  onChange: (value: string, type?: OperationItemType) => void;
  operation: IOperation;
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
        operation={operation}
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
      return (
        <ThemedSelect
          placeholder={`Select ${type}`}
          items={items}
          onChange={onChange}
        />
      );
    case "description":
      return <ThemedInput placeholder={`Description`} onChange={onChange} />;
    case "attachment":
      return <Attachment onChange={onChange} />;
  }
  return null;
};

export default NewOperationBodyItem;
