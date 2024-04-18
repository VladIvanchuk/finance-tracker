import Colors from "@/constants/Colors";
import { useAuth } from "@realm/react";
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import ThemedText from "./ui/ThemedText";

export const AnonymousLogIn = () => {
  const { logInWithAnonymous, result } = useAuth();

  useEffect(() => {
    logInWithAnonymous();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!result.error && <ThemedText>Please wait</ThemedText>}
      <View>
        {result.pending && <ActivityIndicator />}
        {result.error && <Text>{result.error.message}</Text>}
      </View>
    </View>
  );
};
