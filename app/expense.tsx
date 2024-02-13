import OperationForm from "@/components/NewOperation/OperationForm";
import { ITransaction } from "@/types/TransactionTypes";
import { useState } from "react";
import "react-native-get-random-values";
import { BSON } from "realm";

const AddExpense = () => {
  const [operation, setOperation] = useState<ITransaction>({
    _id: new BSON.ObjectId(),
    type: "expense",
    sum: 0,
    accountId: undefined,
    categoryId: undefined,
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
