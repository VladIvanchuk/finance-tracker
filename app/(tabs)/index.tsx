import Activity from "@/components/Home/Activity";
import MonthPicker from "@/components/Home/MonthPicker";
import TotalBalance from "@/components/Home/TotalBalance";
import TransactionsHistory from "@/components/Home/TransactionsHistory";
import React, { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.page_container}>
      <TotalBalance scrollY={scrollY} />
      <Animated.ScrollView
        style={styles.scroll_container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <MonthPicker />
        <Activity />
        <TransactionsHistory />
      </Animated.ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page_container: {
    paddingHorizontal: 4,
  },
  scroll_container: {
    marginBottom: 50,
    paddingHorizontal: 10,
  },
});
