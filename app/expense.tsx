import OperationForm from "@/components/NewOperation/OperationForm";
import { IOperation } from "@/types/Operations";
import { useState } from "react";

const AddExpense = () => {
  const [operation, setOperation] = useState<IOperation>({
    type: "expense",
    value: "",
    category: "",
    accountId: 0,
    description: "",
    currency: "UAH",
    attachment: "",
  });
  return (
    <OperationForm
      operationType="expense"
      operation={operation}
      setOperation={setOperation}
    />
  );
};

export default AddExpense;
