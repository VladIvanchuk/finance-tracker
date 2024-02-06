import { StyleSheet, View, FlatList } from "react-native";
import Colors from "@/constants/Colors";
import {
  OperationItem,
  IOperation,
  OperationType,
  OperationItemType,
} from "@/types/Operations";
import NewOperationBodyItem from "./NewOperationBodyItem";
import { getOperationItems } from "../../utils/operationItems";
import { AccountItem, AccountItemType, IAccount } from "@/types/Accounts";

const NewOperationBody = ({
  operationType,
  operation,
  handleValueChange,
}: {
  handleValueChange: (
    type: OperationItemType | AccountItemType,
    value: string,
  ) => void;
  operationType: OperationType | "account";
  operation: IOperation | IAccount;
}) => {
  const renderItem = ({ item }: { item: OperationItem | AccountItem }) => (
    <NewOperationBodyItem
      id={item.id}
      type={item.type}
      items={item.items}
      operation={operation}
      onChange={(value: string, type?: OperationItemType | AccountItemType) =>
        handleValueChange(type ?? item.type, value)
      }
    />
  );

  const currentOperationItems = getOperationItems(operationType);

  return (
    <View style={styles.body_container}>
      <FlatList
        data={currentOperationItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.body_item_container}
      />
    </View>
  );
};

export default NewOperationBody;

const styles = StyleSheet.create({
  body_container: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 4,
    paddingVertical: 28,
    maxHeight: 440,
  },
  body_item_container: {
    gap: 20,
    paddingHorizontal: 20,
  },
});
