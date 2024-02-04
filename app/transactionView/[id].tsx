import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ThemedText from "@/components/ui/ThemedText";
import { getOperationColor } from "@/utils/defineOperationColor";
import { OperationType } from "@/types/Operations";

const TransactionView = () => {
  const { id, type } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: getOperationColor(type as OperationType),
      },
    });
  }, [navigation]);

  return (
    <View>
      <ThemedText>{id}</ThemedText>
    </View>
  );
};

export default TransactionView;

const styles = StyleSheet.create({});
