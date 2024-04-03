import Colors from "@/constants/Colors";
import { useTransactionItems } from "@/hooks/useTransactionItems";
import { AccountItem, AccountItemType, IAccount } from "@/types/AccountTypes";
import {
  TransactionItem,
  TransactionItemType,
  TransactionType,
} from "@/types/TransactionTypes";
import { ITransaction } from "@/types/TransactionTypes";
import { FlatList, StyleSheet, View } from "react-native";
import NewTransactionBodyItem from "./NewTransactionBodyItem";

const NewTransactionBody = ({
  operationType,
  operation,
  handleValueChange,
}: {
  handleValueChange: (
    type: TransactionItemType | AccountItemType,
    value: string | boolean,
  ) => void;
  operationType: TransactionType | "account";
  operation: ITransaction | IAccount;
}) => {
  const renderItem = ({ item }: { item: TransactionItem | AccountItem }) => (
    <NewTransactionBodyItem
      id={item.id}
      type={item.type}
      items={item.items}
      operation={operation}
      onChange={(
        value: string | boolean,
        type?: TransactionItemType | AccountItemType,
      ) => handleValueChange(type ?? item.type, value)}
    />
  );

  const currentTransactionItems = useTransactionItems(operationType, operation);

  return (
    <View style={styles.body_container}>
      <FlatList
        data={currentTransactionItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.body_item_container}
      />
    </View>
  );
};

export default NewTransactionBody;

const styles = StyleSheet.create({
  body_container: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 4,
    paddingVertical: 28,
    flex: 1,
  },
  body_item_container: {
    gap: 20,
    paddingHorizontal: 20,
  },
});
