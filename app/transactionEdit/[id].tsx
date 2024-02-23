import TransactionForm from "@/components/NewTransaction/TransactionForm";
import { useTransactionActions } from "@/hooks/useTransactionActions";
import { ITransaction, TransactionType } from "@/types/TransactionTypes";
import { getTransactionColor } from "@/utils/getTransactionColor";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";

const EditTransaction = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const { getTransactionById } = useTransactionActions();
  const transaction = getTransactionById(id);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const [operation, setTransaction] = useState<ITransaction>(transaction);

  useLayoutEffect(() => {
    if (transaction) {
      navigation.setOptions({
        title:
          transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
        headerStyle: {
          backgroundColor: getTransactionColor(
            transaction.type as TransactionType
          ),
        },
      });
    }
  }, [navigation, transaction]);

  return (
    <TransactionForm
      type="edit"
      operation={operation}
      setTransaction={setTransaction}
    />
  );
};

export default EditTransaction;
