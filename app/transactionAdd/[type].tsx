import OperationForm from "@/components/NewOperation/OperationForm";
import { CurrencyType, OperationType } from "@/types/OperationTypes";
import { ITransaction } from "@/types/TransactionTypes";
import { getOperationColor } from "@/utils/defineOperationColor";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { BSON } from "realm";

const getInitialData = (type: OperationType): ITransaction => {
  const baseData = {
    _id: new BSON.ObjectId(),
    sum: 0,
    description: "",
    currency: "UAH" as CurrencyType,
    attachment: "",
    date: new Date(),
  };

  switch (type) {
    case "expense":
    case "income":
      return {
        ...baseData,
        type,
        accountId: undefined,
        categoryId: undefined,
      };
    case "transfer":
      return {
        ...baseData,
        type: "transfer",
        fromAccountId: undefined,
        toAccountId: undefined,
      };
    default:
      throw new Error(`Unsupported operation type: ${type}`);
  }
};

const AddOperation = () => {
  const navigation = useNavigation();
  const { type } = useLocalSearchParams();
  const [operation, setOperation] = useState<ITransaction>(
    getInitialData(type as OperationType)
  );

  useLayoutEffect(() => {
    if (typeof type === "string") {
      navigation.setOptions({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        headerStyle: {
          backgroundColor: getOperationColor(type as OperationType),
        },
      });
    }
  }, [navigation, type]);

  return <OperationForm operation={operation} setOperation={setOperation} />;
};

export default AddOperation;
