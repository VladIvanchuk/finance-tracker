import React, { useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from "@/constants/Colors";
import { ChartData } from "@/types/StatisticsTypes";
import ThemedText from "../ui/ThemedText";
import { Spinner } from "@gluestack-ui/themed";

const initialScreenWidth = Dimensions.get("window").width;

const StatsChart = ({
  chartData,
  isLoading,
}: {
  chartData: ChartData | null;
  isLoading: boolean;
}) => {
  const [containerWidth, setContainerWidth] = useState(initialScreenWidth);

  const onLayoutContainer = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  if (isLoading) {
    return (
      <View style={styles.container} onLayout={onLayoutContainer}>
        <View style={styles.placeholder}>
          <Spinner size="large" />
        </View>
      </View>
    );
  }

  if (!chartData) {
    return (
      <View style={styles.container} onLayout={onLayoutContainer}>
        <View style={styles.placeholder}>
          <ThemedText>Not enough data to display the chart.</ThemedText>
          <ThemedText>Create more transactions.</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutContainer}>
      <LineChart
        data={chartData}
        width={containerWidth}
        withDots={false}
        height={220}
        withInnerLines={false}
        withOuterLines={false}
        yAxisSuffix="$"
        chartConfig={{
          backgroundGradientFrom: Colors.tabBarColor,
          backgroundGradientTo: Colors.tabBarColor,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(36, 138, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          fillShadowGradientFrom: Colors.tint,
          fillShadowGradientTo: Colors.tintDark,
          fillShadowGradientFromOffset: 0.2,
          fillShadowGradientToOpacity: 0,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

export default StatsChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabBarColor,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    marginTop: 15,
    paddingTop: 16,
  },
  placeholder: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
});
