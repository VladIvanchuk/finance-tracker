import Colors, { palette } from "@/constants/Colors";
import { AccountData } from "@/types/AccountTypes";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../ui/ThemedText";
import ThemedActionSheet from "../ui/ThemedActionSheet";
import { ActionsheetItem, ActionsheetItemText } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { useAccountActions } from "@/hooks/useAccountActions";
import ThemedAlert from "../ui/ThemedAlert";

const AccountCard = ({
  _id,
  name,
  type,
  balance,
  currency,
  bankName,
  accountNumber,
}: AccountData) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { deleteAccount } = useAccountActions();

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    router.navigate({ pathname: "/accountEdit/[id]", params: { id: _id } });
    handleClose();
  };
  const handleDelete = () => {
    deleteAccount(_id);
    handleClose();
  };

  return (
    <View style={styles.card_container}>
      <View style={styles.card_header}>
        <View style={styles.header_text}>
          <ThemedText style={styles.card_name}>{name}</ThemedText>
        </View>
        <TouchableOpacity onPress={handleOpen}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color={palette.light[100]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.card_body}>
        <View style={styles.body_text}>
          <ThemedText style={styles.bank_name}>{type}</ThemedText>
          <ThemedText style={styles.card_sum}>
            {balance.toFixed(2)} {getCurrencySymbol(currency)}
          </ThemedText>
        </View>
        <View style={[styles.body_text, { alignItems: "flex-end" }]}>
          <ThemedText style={styles.bank_name}>{bankName}</ThemedText>
          {accountNumber && (
            <ThemedText style={styles.card_name}>
              **** {accountNumber.toString().slice(12)}
            </ThemedText>
          )}
        </View>
      </View>
      <ThemedActionSheet
        handleClose={handleClose}
        showActionSheet={isOpen}
        actionSheetItems={
          <ScrollView style={{ width: "100%" }}>
            <ActionsheetItem onPress={handleEdit}>
              <ActionsheetItemText>Edit</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={() => setAlertVisible(true)}>
              <ActionsheetItemText>Delete</ActionsheetItemText>
            </ActionsheetItem>
          </ScrollView>
        }
      />
      <ThemedAlert
        visible={alertVisible}
        title="Delete?"
        message="Are you sure you want to delete this account?"
        onClose={() => setAlertVisible(false)}
        type="delete"
        action={handleDelete}
      />
    </View>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  card_container: {
    backgroundColor: Colors.tintDark,
    height: 200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  card_header: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    gap: 20,
  },
  header_text: { flex: 1, gap: 10 },
  card_name: {
    fontSize: 18,
    fontWeight: "600",
  },
  bank_name: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.dark[20],
  },
  card_body: { flex: 1, flexDirection: "row", alignItems: "flex-end" },
  body_text: { flex: 1, gap: 2, justifyContent: "flex-end" },
  card_sum: { fontSize: 24, fontWeight: "600" },
});
