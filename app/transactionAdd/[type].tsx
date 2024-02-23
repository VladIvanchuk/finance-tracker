import TransactionForm from "@/components/NewTransaction/TransactionForm";
import {
  CurrencyType,
  ITransaction,
  TransactionType,
} from "@/types/TransactionTypes";
import { getTransactionColor } from "@/utils/getTransactionColor";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import "react-native-get-random-values";
import { BSON } from "realm";

const getInitialData = (type: TransactionType): ITransaction => {
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

const AddTransaction = () => {
  const navigation = useNavigation();
  const { type } = useLocalSearchParams();
  const [operation, setTransaction] = useState<ITransaction>(
    getInitialData(type as TransactionType),
  );

  useLayoutEffect(() => {
    if (typeof type === "string") {
      navigation.setOptions({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        headerStyle: {
          backgroundColor: getTransactionColor(type as TransactionType),
        },
      });
    }
  }, [navigation, type]);

  return (
    <TransactionForm operation={operation} setTransaction={setTransaction} />
  );
};

export default AddTransaction;
