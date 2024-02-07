import { getOperationColor } from "@/utils/defineOperationColor";
import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { ITransaction } from "@/types/Transactions";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import Colors from "@/constants/Colors";
import { formatFullDate } from "@/utils/formatFullDate";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

interface TransactionViewHeaderProps {}

const TransactionViewHeader = ({
  type,
  sum,
  currency,
  date,
  category,
}: TransactionViewHeaderProps & ITransaction) => {
  const name = "Name";
  const accountName = "Account Name";
  return (
    <>
      <View
        style={[
          styles.header_container,
          { backgroundColor: getOperationColor(type) },
        ]}
      >
        <ThemedText style={styles.sum}>
          {sum} {getCurrencySymbol(currency)}
        </ThemedText>
        <ThemedText style={styles.desc}>{name}</ThemedText>
        <ThemedText style={styles.date}>{formatFullDate(date)}</ThemedText>
        <View style={styles.info}>
          <View style={styles.info_item}>
            <ThemedText style={styles.info_title}>Type</ThemedText>
            <ThemedText style={styles.info_text}>
              {capitalizeFirstLetter(type)}
            </ThemedText>
          </View>
          {category && (
            <View style={styles.info_item}>
              <ThemedText style={styles.info_title}>Category</ThemedText>
              <ThemedText style={styles.info_text}>
                {capitalizeFirstLetter(category)}
              </ThemedText>
            </View>
          )}
          <View style={styles.info_item}>
            <ThemedText style={styles.info_title}>Account</ThemedText>
            <ThemedText style={styles.info_text}>{accountName}</ThemedText>
          </View>
        </View>
      </View>
    </>
  );
};

export default TransactionViewHeader;

const styles = StyleSheet.create({
  header_container: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    paddingBottom: 50,
    zIndex: 100,
    paddingHorizontal: 16,
  },
  sum: {
    fontWeight: "bold",
    fontSize: 54,
  },
  desc: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 4,
  },
  date: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  info: {
    flexDirection: "row",
    backgroundColor: Colors.tintDark,
    height: 72,
    width: "100%",
    paddingHorizontal: 26,
    borderRadius: 12,
    position: "absolute",
    bottom: -36,
  },
  info_item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  info_title: { fontWeight: "500", fontSize: 16, color: Colors.textSecondary },
  info_text: { fontWeight: "600", fontSize: 18 },
});
