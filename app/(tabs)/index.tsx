import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import TransactionsHistory from "@/components/Home/TransactionsHistory";
import Header from "@/components/ui/Header";
import Colors from "@/constants/Colors";
import ThemedText from "@/components/ui/ThemedText";
import Activity from "@/components/Home/Activity";

const { width } = Dimensions.get("window");

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const balanceOpacity = scrollY.interpolate({
    inputRange: [100, 150],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const balanceScale = scrollY.interpolate({
    inputRange: [100, 150],
    outputRange: [1, 0.85],
    extrapolate: "clamp",
  });
  const balanceTranslateX = scrollY.interpolate({
    inputRange: [100, 200],
    outputRange: [0, width / 2 - 100],
    extrapolate: "clamp",
  });

  const marginTopScale = scrollY.interpolate({
    inputRange: [100, 210],
    outputRange: [32, 8],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.page_container}>
      <Animated.View
        style={[
          styles.balance,
          {
            opacity: balanceOpacity,
            transform: [
              { scale: balanceScale },
              { translateX: balanceTranslateX },
            ],
            marginTop: marginTopScale,
          },
        ]}
      >
        <ThemedText style={styles.number}>13,590.00 ₴</ThemedText>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scroll_container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
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
  balance: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    paddingHorizontal: 14,
  },
  number: { color: Colors.text, fontWeight: "600", fontSize: 32 },
});
