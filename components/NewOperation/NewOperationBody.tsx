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

const NewOperationBody = ({
  setOperation,
  operationType,
  operation,
}: {
  setOperation: React.Dispatch<React.SetStateAction<IOperation>>;
  operationType: OperationType;
  operation: IOperation;
}) => {
  const handleValueChange = (type: OperationItemType, value: string) => {
    setOperation((prev) => {
      const key = type === "account" ? "accountId" : type;
      return { ...prev, [key]: value };
    });
  };

  const renderItem = ({ item }: { item: OperationItem }) => (
    <NewOperationBodyItem
      id={item.id}
      type={item.type}
      items={item.items}
      operation={operation}
      onChange={(value: string, type?: OperationItemType) =>
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
  },
  body_item_container: {
    gap: 20,
    paddingHorizontal: 20,
  },
});
