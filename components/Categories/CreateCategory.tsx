import Colors from "@/constants/Colors";
import { iconConfig } from "@/data/iconConfig";
import { IconNameType } from "@/types/TransactionTypes";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedActionSheet from "../ui/ThemedActionSheet";
import ThemedInput from "../ui/ThemedInput";
import ThemedText from "../ui/ThemedText";
import IconsList from "./IconsList";

interface CreateCategoryProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setIconKey: React.Dispatch<React.SetStateAction<IconNameType | null>>;
  iconKey: IconNameType | null;
}

const CreateCategory = ({
  setName,
  setIconKey,
  iconKey,
}: CreateCategoryProps) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const handleChange = () => setShowActionSheet(!showActionSheet);
  const icon = iconConfig[iconKey as IconNameType];
  const IconComponent = icon ? icon.component : null;

  return (
    <View style={styles.container}>
      <ThemedInput onChange={setName} placeholder="Category name" />
      {!IconComponent ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowActionSheet(true)}
        >
          <ThemedText style={styles.text}>Select icon</ThemedText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowActionSheet(true)}
        >
          <IconComponent name={icon.name} size={28} color={icon.color} />
        </TouchableOpacity>
      )}
      <ThemedActionSheet
        handleClose={handleChange}
        showActionSheet={showActionSheet}
        maxHeight={500}
        actionSheetItems={
          <IconsList setIconKey={setIconKey} handleChange={handleChange} />
        }
      />
    </View>
  );
};

export default CreateCategory;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    gap: 16,
  },
  text: {
    fontSize: 18,
  },
  colors: {
    flexDirection: "row",
    gap: 16,
  },
  color: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  selectedColor: {
    borderColor: Colors.border,
    borderWidth: 2,
  },
  icon: {
    width: "100%",
    height: 60,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
