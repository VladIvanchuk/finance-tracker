import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "@/constants/Colors";
import { ITransaction } from "@/types/Transactions";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getOperationColor } from "@/utils/defineOperationColor";
import ThemedText from "../ui/ThemedText";
import TransactionIcon from "./TransactionIcon";
import { formatShortDate } from "@/utils/formatShortDate";
import { Link, useNavigation } from "expo-router";

interface TransactionItemProps {
  useDate?: boolean;
}

const TransactionItem = ({
  id,
  name,
  description,
  sum,
  currency,
  accountName,
  type,
  iconName,
  date,
  useDate,
}: ITransaction & TransactionItemProps) => {
  const operationColor = getOperationColor(type);
  const currencySymbol = getCurrencySymbol(currency);
  const sign = type === "income" ? "+" : type === "expense" ? "-" : "";
  const formattedSum = `${sign} ${sum.toFixed(2)}`;

  return (
    <Link
      href={{
        pathname: "/transactionView/[id]",
        params: { id: id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <TransactionIcon iconName={iconName} />
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
            <ThemedText style={[styles.price, { color: operationColor }]}>
              {formattedSum} {currencySymbol}
            </ThemedText>
            <ThemedText style={styles.account}>
              {useDate ? formatShortDate(date) : accountName}
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
