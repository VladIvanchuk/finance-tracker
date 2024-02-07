import OperationForm from "@/components/NewOperation/OperationForm";
import { IOperation } from "@/types/OperationTypes";
import { useState } from "react";
import { BSON } from "realm";

const AddIncome = () => {
  const [operation, setOperation] = useState<IOperation>({
    _id: new BSON.ObjectId(),
    type: "income",
    sum: 0,
    category: "",
    accountId: null,
    description: "",
    currency: "UAH",
    attachment: "",
    date: new Date().toISOString(),
  });

  console.log(operation);

  return (
    <OperationForm
      operationType="income"
      operation={operation}
      setOperation={setOperation}
    />
  );
};

export default AddIncome;
