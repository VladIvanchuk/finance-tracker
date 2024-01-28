import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { palette } from "@/constants/Colors";
import NewOperationHeader from "@/components/NewOperation/NewOperationHeader";
import { OperationType } from "@/types/Operations";
import NewOperationBody from "@/components/NewOperation/NewOperationBody";
import NewOperationFooter from "@/components/NewOperation/NewOperationFooter";

const AddIncome = () => {
  const [income, setIncome] = useState<OperationType>({
    value: "",
    category: "",
    description: "",
    accountId: 0,
    currency: "UAH",
    repeat: false,
  });

  return (
    <View style={styles.screen_wrapper}>
      <NewOperationHeader setOperation={setIncome} operation={income} />
      <NewOperationBody setOperation={setIncome} />
      <NewOperationFooter />
    </View>
  );
};

export default AddIncome;

const styles = StyleSheet.create({
  screen_wrapper: {
    flex: 1,
    backgroundColor: palette.green[100],
  },
});
