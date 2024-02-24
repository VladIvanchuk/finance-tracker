import StatsDiagram from "@/components/Statistics/StatsDiagram";
import StatsHeader from "@/components/Statistics/StatsHeader";
import StatsList from "@/components/Statistics/StatsList";
import StatsSwitch from "@/components/Statistics/StatsSwitch";
import { periods } from "@/data/statisticPeriods";
import { useStatisticsAction } from "@/hooks/useStatisticsAction";
import { Transaction } from "@/schemas/Transaction";
import { StatisticType } from "@/types/StatisticsTypes";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Statistics = () => {
  const { type } = useLocalSearchParams();
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
  const [selectedType, setSelectedType] = useState<StatisticType>(
    (type as StatisticType) ?? "income"
  );
  const [transactions, setTransactions] =
    useState<Realm.Results<Transaction> | null>(null);

  const { getTransactionsByPeriodAndType } = useStatisticsAction();

  useEffect(() => {
    const updateTransactions = () => {
      const fetchedTransactions = getTransactionsByPeriodAndType(
        selectedPeriod,
        selectedType
      );
      setTransactions(fetchedTransactions);
    };

    updateTransactions();

    const fetchedTransactions = getTransactionsByPeriodAndType(
      selectedPeriod,
      selectedType
    );

    if (fetchedTransactions) {
      fetchedTransactions.addListener(() => {
        updateTransactions();
      });
    }

    return () => {
      if (fetchedTransactions) {
        fetchedTransactions.removeListener(updateTransactions);
      }
    };
  }, [selectedPeriod, selectedType, getTransactionsByPeriodAndType]);

  return (
    <View style={styles.page_wrapper}>
      <View style={styles.page_container}>
        <StatsHeader
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      </View>
      <ScrollView style={styles.page_container} nestedScrollEnabled={false}>
        <StatsDiagram />
        <StatsSwitch
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <StatsList transactions={transactions} />
      </ScrollView>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  page_wrapper: {
    paddingTop: 6,
    marginTop: 16,
  },
  page_container: {
    paddingHorizontal: 10,
  },
});
