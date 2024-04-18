import Colors from "@/constants/Colors";
import { useAuth } from "@realm/react";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const AnonymousLogIn = () => {
  const { logInWithAnonymous, result } = useAuth();

  useEffect(() => {
    if (!result.pending) {
      logInWithAnonymous();
    }
  }, [result.pending]);

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        {result.pending && <ActivityIndicator />}
        {result.error && <Text>{result.error.message}</Text>}
      </View>
    </View>
  );
};
