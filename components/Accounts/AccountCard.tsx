import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ThemedText from "../ui/ThemedText";
import Colors, { palette } from "@/constants/Colors";
import { IAccount } from "@/types/Accounts";
import { Feather } from "@expo/vector-icons";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { Link } from "expo-router";

const AccountCard = ({
  name,
  type,
  balance,
  currency,
  bankName,
  accountNumber,
}: IAccount) => {
  return (
    <View style={styles.card_container}>
      <View style={styles.card_header}>
        <View style={styles.header_text}>
          <ThemedText style={styles.card_name}>{name}</ThemedText>
        </View>
        <TouchableOpacity>
          <Link href="/editAccount">
            <Feather name="edit" size={24} color={palette.light[100]} />
          </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.card_body}>
        <View style={styles.body_text}>
          <ThemedText style={styles.bank_name}>{type}</ThemedText>
          <ThemedText style={styles.card_sum}>
            {balance} {getCurrencySymbol(currency)}
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
