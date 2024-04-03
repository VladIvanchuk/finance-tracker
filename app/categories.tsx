import CategoriesList from "@/components/Categories/CategoriesList";
import CreateCategory from "@/components/Categories/CreateCategory";
import StatsSwitch from "@/components/Statistics/StatsSwitch";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedModal from "@/components/ui/ThemedModal";
import { StatisticType } from "@/types/StatisticsTypes";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const Categories = () => {
  const [selectedType, setSelectedType] = useState<StatisticType>("income");
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <StatsSwitch
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </View>
      <CategoriesList type={selectedType} />
      <View style={styles.footer} ref={ref}>
        <ThemedButton label="Add new" onPress={() => setShowModal(true)} />
      </View>
      <ThemedModal
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        title="New category"
      >
        <CreateCategory />
      </ThemedModal>
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
