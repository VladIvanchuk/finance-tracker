import OperationForm from "@/components/NewOperation/OperationForm";
import { CurrencyType, OperationType } from "@/types/OperationTypes";
import { ITransaction } from "@/types/TransactionTypes";
import React, { useState } from "react";
import { BSON } from "realm";

const getInitialData = (type: OperationType): ITransaction => {
  const baseData = {
    _id: new BSON.ObjectId(),
    sum: 0,
    description: "",
    currency: "UAH" as CurrencyType,
    attachment: "",
    date: new Date(),
  };

  switch (type) {
    case "expense":
      return {
        ...baseData,
        type: "expense",
        accountId: undefined,
        categoryId: undefined,
      };
    case "income":
      return {
        ...baseData,
        type: "income",
        accountId: undefined,
        categoryId: undefined,
      };
    case "transfer":
      return {
        ...baseData,
        type: "transfer",
        fromAccountId: undefined,
        toAccountId: undefined,
      };
    default:
      throw new Error(`Unsupported operation type: ${type}`);
  }
};

const AddOperation = ({ type }: { type: OperationType }) => {
  const [operation, setOperation] = useState<ITransaction>(
    getInitialData(type)
  );
  return <OperationForm operation={operation} setOperation={setOperation} />;
};

export default AddOperation;
