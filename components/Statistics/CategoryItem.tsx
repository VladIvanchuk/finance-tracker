import Colors from "@/constants/Colors";
import { Category } from "@/schemas/Category";
import { StatisticType } from "@/types/StatisticsTypes";
import { IconNameType } from "@/types/TransactionTypes";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getTransactionColor } from "@/utils/getTransactionColor";
import React from "react";
import { StyleSheet, View } from "react-native";
import TransactionIcon from "../Home/TransactionIcon";
import ThemedText from "../ui/ThemedText";

interface CategoryItemProps {
  category: Category;
  sum: number;
  type: StatisticType;
}

const CategoryItem = ({ category, sum, type }: CategoryItemProps) => {
  const transactionColor = getTransactionColor(type);
  const currencySymbol = getCurrencySymbol("UAH");
  const sign = type === "income" ? "+" : type === "expense" ? "-" : "";
  const formattedSum = `${sign} ${sum.toFixed(2)}`;

  return (
    <View style={styles.container}>
      <TransactionIcon iconName={category.iconKey as IconNameType} />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.name}>{category.name}</ThemedText>
        </View>
        <View style={[styles.textContainer, styles.alignRight]}>
          <ThemedText style={[styles.price, { color: transactionColor }]}>
            {formattedSum} {currencySymbol}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tintDark,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "space-between",
    flex: 1,
  },
  infoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  alignRight: {
    alignItems: "flex-end",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
});
