import TransactionViewBody from "@/components/TransactionView/TransactionViewBody";
import TransactionViewHeader from "@/components/TransactionView/TransactionViewHeader";
import ThemedAlert from "@/components/ui/ThemedAlert";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedText from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import { usePopToTop } from "@/hooks/usePopToTop";
import { useTransactionActions } from "@/hooks/useTransactionActions";
import { Transaction } from "@/schemas/Transaction";
import { OperationType } from "@/types/OperationTypes";
import { getOperationColor } from "@/utils/defineOperationColor";
import { MaterialIcons } from "@expo/vector-icons";
import { useObject } from "@realm/react";
import { ObjectId } from "bson";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const TransactionView = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const { deleteTransaction } = useTransactionActions();
  const popToTop = usePopToTop();
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const primaryKey = Array.isArray(id) ? new ObjectId(id[0]) : new ObjectId(id);

  const transaction = useObject(Transaction, primaryKey);

  const handleDelete = () => {
    deleteTransaction(primaryKey);
    popToTop();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: getOperationColor(transaction?.type as OperationType),
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

  if (!transaction) {
    return (
      <View style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TransactionViewHeader {...transaction} />
      <TransactionViewBody {...transaction} />
      <View style={styles.footer}>
        <ThemedButton label="Edit" />
      </View>
      <ThemedAlert
        visible={alertVisible}
        title="Delete?"
        message="Are you sure you want to delete this transaction?"
        onClose={() => setAlertVisible(false)}
        type="delete"
        action={handleDelete}
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
