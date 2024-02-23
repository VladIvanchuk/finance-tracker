import Colors from "@/constants/Colors";
import { IconNameType, TransactionData } from "@/types/TransactionTypes";
import { formatShortDate } from "@/utils/formatShortDate";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getTransactionColor } from "@/utils/getTransactionColor";
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
  category,
  fromAccount,
  toAccount,
}: TransactionData & TransactionItemProps) => {
  const transactionColor = getTransactionColor(type);
  const currencySymbol = getCurrencySymbol(currency);
  const sign = type === "income" ? "+" : type === "expense" ? "-" : "";
  const formattedSum = `${sign} ${sum.toFixed(2)}`;

  const icon = type === "transfer" ? "money-bill-transfer" : category?.iconKey;
  const name = type === "transfer" ? "Transfer" : category?.name;
  const accountName =
    type === "transfer"
      ? `${fromAccount?.name} > ${toAccount?.name}`
      : account?.name;

  return (
    <Link
      href={{
        pathname: "/transactionView/[id]",
        params: { id: _id.toString() },
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <TransactionIcon iconName={icon as IconNameType} />
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.name}>{name}</ThemedText>
            <ThemedText
              style={styles.description}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {description}
            </ThemedText>
          </View>
          <View style={[styles.textContainer, styles.alignRight]}>
            <ThemedText style={[styles.price, { color: transactionColor }]}>
              {formattedSum} {currencySymbol}
            </ThemedText>
            <ThemedText style={styles.account}>
              {useDate ? formatShortDate(date.toISOString()) : accountName}
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
