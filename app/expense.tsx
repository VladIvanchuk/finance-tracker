import OperationForm from "@/components/NewOperation/OperationForm";
import { IOperation } from "@/types/OperationTypes";
import { useState } from "react";
import "react-native-get-random-values";
import { BSON } from "realm";

const AddExpense = () => {
  const [operation, setOperation] = useState<IOperation>({
    _id: new BSON.ObjectId(),
    type: "expense",
    sum: 0,
    categoryId: null,
    accountId: null,
    description: "",
    currency: "UAH",
    attachment: "",
    date: new Date().toISOString(),
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
