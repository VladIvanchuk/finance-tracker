import { StyleSheet, Pressable, Dimensions, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const TabBarButton = ({
  onToggle,
  isMenuVisible,
}: {
  onToggle: () => void;
  isMenuVisible: boolean;
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isRotated, setIsRotated] = useState(false);

  const rotateIcon = () => {
    setIsRotated(!isRotated);

    Animated.timing(rotateAnim, {
      toValue: isRotated ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const iconStyle = {
    transform: [{ rotate: rotation }],
  };

  useEffect(() => {
    rotateIcon();
  }, [isMenuVisible]);

  return (
    <Pressable onPress={onToggle} style={styles.button}>
      <Animated.View style={iconStyle}>
        <Ionicons name="add" color="white" size={30} />
      </Animated.View>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: width / 2 - 30,
    bottom: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.blue[100],
    borderRadius: 100,
    zIndex: 10,
  },
});
