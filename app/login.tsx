import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import ThemedText from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import useThemedToast from "@/hooks/useThemedToast";
import { login } from "@/services/authService";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const showToast = useThemedToast();

  const handleLogin = async () => {
    try {
      await login(email, password);
      showToast("Login successful", "You are logged in now", "success");
      router.navigate({ pathname: "profile" });
    } catch (error) {
      showToast(
        "Authentication error:",
        error instanceof Error ? error.message : String(error),
        "error",
      );
    }
  };

  return (
    <View style={styles.container}>
      <ThemedInput onChange={(e) => setEmail(e)} placeholder="Email" />
      <ThemedInput
        type="password"
        onChange={(e) => setPassword(e)}
        placeholder="Password"
      />
      <ThemedButton label="Sign In" onPress={handleLogin} />
      <View style={styles.footer}>
        <ThemedText>Don&apos;t have an account?</ThemedText>
        <Link style={styles.link} href="/register">
          Sign Up
        </Link>
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
