import Colors from "@/constants/Colors";
import { ICategory } from "@/types/CategoryTypes";
import { IconNameType } from "@/types/TransactionTypes";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getTransactionColor } from "@/utils/getTransactionColor";
import React from "react";
import { StyleSheet, View } from "react-native";
import TransactionIcon from "../Home/TransactionIcon";
import ThemedText from "../ui/ThemedText";

const CategoryStatisticHeader = ({ name, type, iconKey }: ICategory) => {
  return (
    <View
      style={[
        styles.header_container,
        { backgroundColor: getTransactionColor(type) },
      ]}
    >
      <View style={styles.header}>
        <TransactionIcon iconName={iconKey as IconNameType} />
        <ThemedText style={styles.name}>{name}</ThemedText>
      </View>
      <ThemedText style={styles.type}>{capitalizeFirstLetter(type)}</ThemedText>
    </View>
  );
};

export default CategoryStatisticHeader;

const styles = StyleSheet.create({
  header_container: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    paddingBottom: 32,
    paddingTop: 15,
    zIndex: 100,
    paddingHorizontal: 16,
    backgroundColor: Colors.tintDark,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 16 },
  name: {
    fontWeight: "bold",
    fontSize: 54,
  },
  type: {
    fontWeight: "500",
    fontSize: 20,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});
