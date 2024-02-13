import OperationForm from "@/components/NewOperation/OperationForm";
import { ITransaction } from "@/types/TransactionTypes";
import React, { useState } from "react";
import "react-native-get-random-values";
import { BSON } from "realm";

const AddTransfer = () => {
  const [operation, setOperation] = useState<ITransaction>({
    _id: new BSON.ObjectId(),
    type: "transfer",
    sum: 0,
    fromAccountId: undefined,
    toAccountId: undefined,
    description: "",
    currency: "UAH",
    attachment: "",
    date: new Date().toISOString(),
  });

  return (
    <OperationForm
      operationType="transfer"
      operation={operation}
      setOperation={setOperation}
    />
  );
};

export default AddTransfer;
