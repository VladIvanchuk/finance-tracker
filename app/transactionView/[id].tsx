import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getOperationColor } from "@/utils/defineOperationColor";
import { OperationType } from "@/types/Operations";
import TransactionViewHeader from "@/components/TransactionView/TransactionViewHeader";
import transactions from "@/mock/transactions.json";
import { ITransaction } from "@/types/Transactions";
import Colors from "@/constants/Colors";
import ThemedButton from "@/components/ui/ThemedButton";
import { MaterialIcons } from "@expo/vector-icons";
import ThemedAlert from "@/components/ui/ThemedAlert";
import TransactionViewBody from "@/components/TransactionView/TransactionViewBody";

const TransactionView = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const transaction = transactions[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: getOperationColor(transaction.type as OperationType),
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setAlertVisible(true)}
          style={{ marginRight: 8 }}
        >
          <MaterialIcons name="delete" size={24} color={Colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TransactionViewHeader {...(transaction as ITransaction)} />
      <TransactionViewBody {...(transaction as ITransaction)} />
      <View style={styles.footer}>
        <ThemedButton label="Edit" />
      </View>
      <ThemedAlert
        visible={alertVisible}
        title="Delete?"
        message="Are you sure you want to delete this transaction?"
        onClose={() => setAlertVisible(false)}
        type="delete"
      />
    </View>
  );
};

export default TransactionView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  footer: { padding: 16 },
});
