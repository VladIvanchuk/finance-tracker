import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { palette } from "@/constants/Colors";
import NewOperationBody from "@/components/NewOperation/NewOperationBody";
import NewOperationFooter from "@/components/NewOperation/NewOperationFooter";
import NewOperationHeader from "@/components/NewOperation/NewOperationHeader";
import { OperationType } from "@/types/Operations";
import income from "./income";

const AddExpense = () => {
  const [expense, setExpense] = useState<OperationType>({
    value: "",
    category: "",
    description: "",
    accountId: 0,
    currency: "UAH",
    repeat: false,
  });

  return (
    <View style={styles.screen_wrapper}>
      <NewOperationHeader setOperation={setExpense} operation={expense} />
      <NewOperationBody setOperation={setExpense} />
      <NewOperationFooter />
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  screen_wrapper: {
    flex: 1,
    backgroundColor: palette.red[100],
  },
});
