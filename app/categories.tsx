import CategoriesList from "@/components/Categories/CategoriesList";
import CreateCategory from "@/components/Categories/CreateCategory";
import StatsSwitch from "@/components/Statistics/StatsSwitch";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedModal from "@/components/ui/ThemedModal";
import { useCategoryActions } from "@/hooks/useCategoryActions";
import useThemedToast from "@/hooks/useThemedToast";
import { StatisticType } from "@/types/StatisticsTypes";
import { IconNameType } from "@/types/TransactionTypes";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BSON } from "realm";

const Categories = () => {
  const [selectedType, setSelectedType] = useState<StatisticType>("income");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState<IconNameType | null>(null);
  const ref = React.useRef(null);
  const showToast = useThemedToast();
  const { createCategory } = useCategoryActions();

  const handleSubmit = () => {
    if (name === "") {
      showToast("Invalid data", "Please select an category name.", "error");
      return;
    }
    if (!iconKey) {
      showToast("Invalid data", "Please select an category icon.", "error");
      return;
    }
    const newCategory = {
      _id: new BSON.ObjectId(),
      name,
      type: selectedType,
      iconKey,
    };
    createCategory(newCategory);
    showToast("Success", `Category created successfully`, "success");
    setShowModal(false);
  };
  const handleCancel = () => {
    setName("");
    setIconKey(null);
  };

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
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        <CreateCategory
          setName={setName}
          setIconKey={setIconKey}
          iconKey={iconKey}
        />
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
