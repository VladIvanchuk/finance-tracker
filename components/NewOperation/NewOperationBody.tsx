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
  const handleValueChange = (type: keyof OperationType, value: string) => {
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
    flex: 3,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  body_item_container: {
    gap: 16,
    flex: 1,
  },
});
