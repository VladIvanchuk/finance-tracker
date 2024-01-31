import { StyleSheet, View, FlatList } from "react-native";
import Colors from "@/constants/Colors";
import { OperationItem, OperationType } from "@/types/Operations";
import NewOperationBodyItem from "./NewOperationBodyItem";
import operationItems from "./operationItems";

const NewOperationBody = ({
  setOperation,
}: {
  setOperation: React.Dispatch<React.SetStateAction<OperationType>>;
}) => {
  const handleValueChange = (
    type:
      | "category"
      | "currency"
      | "account"
      | "description"
      | "attachment"
      | "repeat",
    value: string
  ) => {
    setOperation((prev) => ({ ...prev, [type]: value }));
  };

  const renderItem = ({ item }: { item: OperationItem }) => (
    <NewOperationBodyItem
      id={item.id}
      type={item.type}
      items={item.items}
      onChange={(value: string) => handleValueChange(item.type, value)}
    />
  );

  return (
    <View style={styles.body_container}>
      <FlatList
        data={operationItems}
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
    paddingTop: 28,
    flex: 3,
  },
  body_item_container: {
    gap: 20,
    paddingHorizontal: 20,
  },
});
