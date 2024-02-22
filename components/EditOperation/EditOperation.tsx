import OperationForm from "@/components/NewOperation/OperationForm";
import { Transaction } from "@/schemas/Transaction";
import { ITransaction } from "@/types/TransactionTypes";
import React, { useState } from "react";

const getInitialData = (data: Transaction): ITransaction => {
  const {
    _id,
    sum,
    description,
    currency,
    attachment,
    date,
    type,
    account,
    categoryId,
    fromAccount,
    toAccount,
  } = data;

  const baseData: ITransaction = {
    _id,
    sum,
    description,
    currency,
    attachment,
    date,
    type,
    // Initialize other properties based on the type
    accountId: undefined,
    categoryId: undefined,
    fromAccountId: undefined,
    toAccountId: undefined,
  };

  switch (type) {
    case "expense":
    case "income":
      baseData.accountId = account?._id;
      baseData.categoryId = categoryId;
      break;
    case "transfer":
      baseData.fromAccountId = fromAccount?._id;
      baseData.toAccountId = toAccount?._id;
      break;
    default:
      throw new Error(`Unsupported operation type: ${type}`);
  }

  return baseData;
};

const EditOperation = ({ data }: { data: Transaction }) => {
  const [operation, setOperation] = useState<ITransaction>(
    getInitialData(data)
  );

  return <OperationForm operation={operation} setOperation={setOperation} />;
};

export default EditOperation;
