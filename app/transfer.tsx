import React, { useState } from "react";
import OperationForm from "@/components/NewOperation/OperationForm";
import { IOperation } from "@/types/Operations";

const AddTransfer = () => {
  const [operation, setOperation] = useState<IOperation>({
    type: "transfer",
    sum: "",
    fromAccountId: 0,
    toAccountId: 0,
    description: "",
    currency: "UAH",
    attachment: "",
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
