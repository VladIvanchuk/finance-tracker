import OperationForm from "@/components/NewOperation/OperationForm";
import { IOperation } from "@/types/OperationTypes";
import React, { useState } from "react";
import "react-native-get-random-values";
import { BSON } from "realm";

const AddTransfer = () => {
  const [operation, setOperation] = useState<IOperation>({
    _id: new BSON.ObjectId(),
    type: "transfer",
    sum: 0,
    fromAccountId: null,
    toAccountId: null,
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
