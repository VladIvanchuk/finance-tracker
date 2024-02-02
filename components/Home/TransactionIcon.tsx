import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconNameType } from "@/types/Transactions";
import { iconConfig } from "@/utils/getTransactionIcon";

const TransactionIcon = ({ iconName }: { iconName: IconNameType }) => {
  const icon = iconConfig[iconName];
  if (!icon) return null;

  const IconComponent = icon.component;
  return (
    <View style={[styles.icon, { backgroundColor: icon.backgroundColor }]}>
      <IconComponent name={icon.name} size={28} color={icon.color} />
    </View>
  );
};
export default TransactionIcon;

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
