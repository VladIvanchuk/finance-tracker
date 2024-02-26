import StatsChart from "@/components/Statistics/StatsChart";
import StatsHeader from "@/components/Statistics/StatsHeader";
import StatsList from "@/components/Statistics/StatsList";
import StatsSwitch from "@/components/Statistics/StatsSwitch";
import { periods } from "@/data/statisticPeriods";
import { useStatisticsAction } from "@/hooks/useStatisticsAction";
import { Category } from "@/schemas/Category";
import { Transaction } from "@/schemas/Transaction";
import { ChartData, Period, StatisticType } from "@/types/StatisticsTypes";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Statistics = () => {
  const { type } = useLocalSearchParams();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(periods[0]);
  const [selectedType, setSelectedType] = useState<StatisticType>(
    (type as StatisticType) ?? "income",
  );
  const [transactions, setTransactions] =
    useState<Realm.Results<Transaction> | null>(null);
  const [categories, setCategories] = useState<Array<{
    category: Category;
    sum: number;
  }> | null>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const {
    getTransactionsByPeriodAndType,
    getCategoriesWithAmountsByPeriodAndType,
    getChartData,
  } = useStatisticsAction();

  useEffect(() => {
    setSelectedType((type as StatisticType) ?? "income");
  }, [type]);

  useEffect(() => {
    const updateTransactions = () => {
      const fetchedTransactions = getTransactionsByPeriodAndType(
        selectedPeriod,
        selectedType,
      );
      setTransactions(fetchedTransactions);
    };
    updateTransactions();

    const fetchedTransactions = getTransactionsByPeriodAndType(
      selectedPeriod,
      selectedType,
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
  }, [selectedPeriod, selectedType]);

  useEffect(() => {
    const fetchedCategories = getCategoriesWithAmountsByPeriodAndType(
      selectedPeriod,
      selectedType,
    );
    setCategories(fetchedCategories);
  }, [selectedPeriod, selectedType]);

  useEffect(() => {
    const fetchedChartData = getChartData(selectedPeriod, selectedType);
    setChartData(fetchedChartData);
  }, [selectedPeriod, selectedType]);

  return (
    <View style={styles.page_wrapper}>
      <View style={styles.page_container}>
        <StatsHeader
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      </View>
      <ScrollView style={styles.page_container} nestedScrollEnabled={false}>
        <StatsChart chartData={chartData} />
        <StatsSwitch
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <StatsList
          transactions={transactions}
          categories={categories}
          type={selectedType}
        />
      </ScrollView>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  page_wrapper: {
    paddingTop: 6,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  page_container: {
    paddingHorizontal: 10,
  },
});
