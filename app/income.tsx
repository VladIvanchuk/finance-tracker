import "react-native-get-random-values";
import OperationForm from "@/components/NewOperation/OperationForm";
import { useState } from "react";
import { BSON } from "realm";
import { ITransaction } from "@/types/TransactionTypes";

const AddIncome = () => {
  const [operation, setOperation] = useState<ITransaction>({
    _id: new BSON.ObjectId(),
    type: "income",
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
      operationType="income"
      operation={operation}
      setOperation={setOperation}
    />
  );
};

export default AddIncome;
