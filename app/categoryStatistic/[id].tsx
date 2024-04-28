import CategoryStatisticHeader from "@/components/CategoryStatistic/CategoryStatisticHeader";
import CategoryStatisticList from "@/components/CategoryStatistic/CategoryStatisticList";
import StatsChart from "@/components/Statistics/StatsChart";
import StatsHeader from "@/components/Statistics/StatsHeader";
import ThemedText from "@/components/ui/ThemedText";
import { periods } from "@/data/statisticPeriods";
import { useCategoryActions } from "@/hooks/useCategoryActions";
import { useStatisticsAction } from "@/hooks/useStatisticsAction";
import { Transaction } from "@/schemas/Transaction";
import { ChartData, Period, StatisticType } from "@/types/StatisticsTypes";
import { TransactionType } from "@/types/TransactionTypes";
import { getTransactionColor } from "@/utils/getTransactionColor";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const CategoryStatistic = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(periods[0]);
  const [transactions, setTransactions] =
    useState<Realm.Results<Transaction> | null>(null);
  const { id } = useLocalSearchParams();
  const { getCategoryById } = useCategoryActions();
  const navigation = useNavigation();
  const { getChartData, getTransactionsByPeriodAndType } =
    useStatisticsAction();
  const category = getCategoryById(id)!;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: getTransactionColor(category?.type as TransactionType),
      },
    });
  }, [navigation]);

  useEffect(() => {
    const updateTransactions = async () => {
      const fetchedTransactions = getTransactionsByPeriodAndType(
        selectedPeriod,
        category.type as StatisticType,
      );
      setTransactions(fetchedTransactions);
    };

    const fetchedTransactions = getTransactionsByPeriodAndType(
      selectedPeriod,
      category.type as StatisticType,
    );

    if (fetchedTransactions) {
      fetchedTransactions.addListener(() => {
        updateTransactions();
      });
    }
    updateTransactions();

    return () => {
      if (fetchedTransactions) {
        fetchedTransactions.removeListener(updateTransactions);
      }
    };
  }, [selectedPeriod]);

  useEffect(() => {
    const fetchChartData = async () => {
      const fetchedChartData = await getChartData(
        selectedPeriod,
        category.type as StatisticType,
        category?._id.toString(),
      );
      setChartData(fetchedChartData);
    };
    fetchChartData();
  }, [selectedPeriod]);

  if (!category) {
    return (
      <View style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  return (
    <View>
      <CategoryStatisticHeader {...category} />
      <ScrollView style={styles.body}>
        <StatsHeader
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        <StatsChart chartData={chartData} isLoading={!category} />
        <CategoryStatisticList
          isLoading={!category}
          transactions={transactions}
        />
      </ScrollView>
    </View>
  );
};

export default CategoryStatistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  body: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 60,
  },
});
