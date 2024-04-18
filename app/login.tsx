import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import ThemedText from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import useThemedToast from "@/hooks/useThemedToast";
import { useEmailPasswordAuth } from "@realm/react";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Login = () => {
  const { logIn, result } = useEmailPasswordAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const showToast = useThemedToast();

  const handleLogin = () => {
    logIn({ email, password });
  };

  useEffect(() => {
    if (result.operation === "logIn") {
      if (result.error) {
        showToast("Authentication error:", result.error.message, "error");
      } else if (result.success) {
        showToast("Login successful", "You are logged in now", "success");
      }
    }
  }, [result]);

  const navigateToRegister = () => {
    router.navigate({ pathname: "register" });
  };

  return (
    <View style={styles.container}>
      <ThemedInput onChange={(e) => setEmail(e)} placeholder="Email" />
      <ThemedInput
        type="password"
        onChange={(e) => setPassword(e)}
        placeholder="Password"
      />
      <ThemedButton
        isLoading={result.pending}
        label="Sign In"
        onPress={handleLogin}
      />
      <View style={styles.footer}>
        <ThemedText>Don&apos;t have an account?</ThemedText>
        <TouchableOpacity onPress={navigateToRegister}>
          <ThemedText style={styles.link}> Sign Up</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    color: Colors.tint,
  },
});
