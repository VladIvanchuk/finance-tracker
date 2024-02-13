import Colors from "@/constants/Colors";
import { useCategoryActions } from "@/hooks/useCategoryActions";
import { IconNameType, TransactionData } from "@/types/TransactionTypes";
import { getOperationColor } from "@/utils/defineOperationColor";
import { formatShortDate } from "@/utils/formatShortDate";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../ui/ThemedText";
import TransactionIcon from "./TransactionIcon";

interface TransactionItemProps {
  useDate?: boolean;
}

const TransactionItem = ({
  _id,
  description,
  sum,
  currency,
  type,
  date,
  useDate,
  account,
  categoryId,
}: TransactionData & TransactionItemProps) => {
  const operationColor = getOperationColor(type);
  const currencySymbol = getCurrencySymbol(currency);
  const sign = type === "income" ? "+" : type === "expense" ? "-" : "";
  const formattedSum = `${sign} ${sum.toFixed(2)}`;
  const { getCategoryById } = useCategoryActions();

  const category = categoryId ? getCategoryById(categoryId) : null;

  return (
    <Link
      href={{
        pathname: "/transactionView/[id]",
        params: { id: _id.toString() },
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <TransactionIcon iconName={category?.iconKey as IconNameType} />
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.name}>{category?.name}</ThemedText>
            <ThemedText
              style={styles.description}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {description}
            </ThemedText>
          </View>
          <View style={[styles.textContainer, styles.alignRight]}>
            <ThemedText style={[styles.price, { color: operationColor }]}>
              {formattedSum} {currencySymbol}
            </ThemedText>
            <ThemedText style={styles.account}>
              {useDate ? formatShortDate(date) : account?.name}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tintDark,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "space-between",
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
  description: {
    fontSize: 13,
    fontWeight: "400",
  },
  account: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },
  infoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
});
