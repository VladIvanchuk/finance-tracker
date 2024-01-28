import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Colors, { palette } from "@/constants/Colors";
import NewOperationHeader from "@/components/NewOperation/NewOperationHeader";
import { OperationType } from "@/types/Operations";

const AddIncome = () => {
  const [income, setIncome] = useState<OperationType>({
    value: "",
    category: "",
    description: "",
    accountId: 0,
    currency: "UAH",
    repeat: false,
  });

  console.log(income);

  return (
    <View style={styles.screen_wrapper}>
      <NewOperationHeader setOperation={setIncome} operation={income} />
      <View style={styles.screen_body}>
        <Text>ModalScreen</Text>
      </View>
    </View>
  );
};

export default AddIncome;

const styles = StyleSheet.create({
  screen_wrapper: {
    flex: 1,
    backgroundColor: palette.green[100],
  },
  screen_header: {
    flex: 1,
  },
  screen_body: {
    flex: 3,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
});
