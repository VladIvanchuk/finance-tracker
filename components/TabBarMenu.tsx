import {
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import TabBarButton from "./TabBarButton";
import { palette } from "@/constants/Colors";
import { ExpenseIcon, IncomeIcon, TransferIcon } from ".";

const { width } = Dimensions.get("window");

const TabBarMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
    animateButtons(!isMenuVisible);
  };

  const leftButtonAnim = useRef(new Animated.Value(0)).current;
  const middleButtonAnim = useRef(new Animated.Value(0)).current;
  const rightButtonAnim = useRef(new Animated.Value(0)).current;

  const animateButtons = (visible: boolean) => {
    const toValue = visible ? 1 : 0;

    Animated.stagger(50, [
      Animated.timing(middleButtonAnim, {
        toValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(leftButtonAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rightButtonAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const leftButtonStyle = {
    transform: [
      {
        translateY: leftButtonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40],
        }),
      },
      {
        translateX: leftButtonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
    ],
  };

  const middleButtonStyle = {
    transform: [
      {
        translateY: middleButtonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -95],
        }),
      },
      // No translateX needed for middle button as it moves straight up
    ],
  };

  const rightButtonStyle = {
    transform: [
      {
        translateY: rightButtonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40],
        }),
      },
      {
        translateX: rightButtonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 60],
        }),
      },
    ],
  };

  return (
    <>
      <View style={styles.menu}>
        <Animated.View
          style={[styles.button, styles.left_button, leftButtonStyle]}
        >
          <Pressable onPress={() => console.log("Кнопка 1 натиснута")}>
            <IncomeIcon />
          </Pressable>
        </Animated.View>
        <Animated.View
          style={[styles.button, styles.middle_button, middleButtonStyle]}
        >
          <Pressable onPress={() => console.log("Кнопка 2 натиснута")}>
            <TransferIcon />
          </Pressable>
        </Animated.View>
        <Animated.View
          style={[styles.button, styles.right_button, rightButtonStyle]}
        >
          <Pressable onPress={() => console.log("Кнопка 3 натиснута")}>
            <ExpenseIcon />
          </Pressable>
        </Animated.View>
      </View>
      <TabBarButton onToggle={toggleMenu} />
    </>
  );
};

export default TabBarMenu;

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    left: width / 2 - 25,
    bottom: 90,
    width: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  left_button: {
    position: "absolute",
    backgroundColor: palette.green[100],
  },
  middle_button: {
    position: "absolute",
    backgroundColor: palette.yellow[80],
  },
  right_button: {
    position: "absolute",
    backgroundColor: palette.red[100],
  },
});
