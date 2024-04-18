import "react-native-get-random-values";
import TransactionForm from "@/components/NewTransaction/TransactionForm";
import {
  CurrencyType,
  ITransaction,
  TransactionType,
} from "@/types/TransactionTypes";
import { getTransactionColor } from "@/utils/getTransactionColor";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { BSON } from "realm";
import { useUser } from "@realm/react";

const getInitialData = (
  type: TransactionType,
  userId: string,
): ITransaction => {
  const baseData = {
    _id: new BSON.ObjectId(),
    owner_id: userId,
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
  const userId = useUser().id!;
  const navigation = useNavigation();
  const { type } = useLocalSearchParams();
  const [operation, setTransaction] = useState<ITransaction>(
    getInitialData(type as TransactionType, userId),
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
