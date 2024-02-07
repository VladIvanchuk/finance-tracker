import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getOperationColor } from "@/utils/defineOperationColor";
import { OperationType } from "@/types/OperationTypes";
import TransactionViewHeader from "@/components/TransactionView/TransactionViewHeader";
import Colors from "@/constants/Colors";
import ThemedButton from "@/components/ui/ThemedButton";
import { MaterialIcons } from "@expo/vector-icons";
import ThemedAlert from "@/components/ui/ThemedAlert";
import TransactionViewBody from "@/components/TransactionView/TransactionViewBody";
import { useObject, useRealm } from "@realm/react";
import { Transaction } from "@/models/Transaction";
import ThemedText from "@/components/ui/ThemedText";
import { ObjectId } from "bson";
import { StackActions } from "@react-navigation/native";

const TransactionView = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const primaryKey = Array.isArray(id) ? new ObjectId(id[0]) : new ObjectId(id);

  const transaction = useObject(Transaction, primaryKey);
  const realm = useRealm();

  const handlePopToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };
  const handleDelete = () => {
    const toDelete = realm
      .objects(Transaction)
      .filtered("_id == $0", primaryKey);
    realm.write(() => {
      realm.delete(toDelete);
    });
    handlePopToTop();
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
