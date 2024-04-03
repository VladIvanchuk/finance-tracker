import CategoriesList from "@/components/Categories/CategoriesList";
import StatsSwitch from "@/components/Statistics/StatsSwitch";
import ThemedButton from "@/components/ui/ThemedButton";
import { StatisticType } from "@/types/StatisticsTypes";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const Categories = () => {
  const [selectedType, setSelectedType] = useState<StatisticType>("income");

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <StatsSwitch
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </View>
      <CategoriesList type={selectedType} />
      <View style={styles.footer}>
        <ThemedButton label="Add new" />
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 4,
  },
  switchContainer: {
    marginHorizontal: 10,
  },
  footer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
