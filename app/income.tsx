import OperationForm from "@/components/NewOperation/OperationForm";
import { IOperation } from "@/types/Operations";
import { useState } from "react";

const AddIncome = () => {
  const [operation, setOperation] = useState<IOperation>({
    type: "income",
    value: "",
    category: "",
    accountId: 0,
    description: "",
    currency: "UAH",
    attachment: "",
  });

  return (
    <OperationForm
      operationType="income"
      operation={operation}
      setOperation={setOperation}
    />
  );
};

export default AddIncome;
