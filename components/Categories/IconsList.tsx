import { iconConfig } from "@/data/iconConfig";
import { IconNameType } from "@/types/TransactionTypes";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface IconsListProps {
  setIconKey: React.Dispatch<React.SetStateAction<IconNameType | null>>;
  handleChange: () => void;
}

const IconsList = ({ setIconKey, handleChange }: IconsListProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries(iconConfig).map(([iconName, iconDetails]) => {
        const IconComponent = iconDetails.component;
        return (
          <TouchableOpacity
            onPress={() => {
              setIconKey(iconName as IconNameType);
              handleChange();
            }}
            key={iconName}
            style={[
              styles.iconContainer,
              { backgroundColor: iconDetails.backgroundColor },
            ]}
          >
            <IconComponent
              name={iconDetails.name}
              size={28}
              color={iconDetails.color}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default IconsList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 20,
    borderRadius: 16,
  },
});
