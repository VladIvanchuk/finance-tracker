import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import ThemedText from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import useThemedToast from "@/hooks/useThemedToast";
import { AuthOperationName, useEmailPasswordAuth } from "@realm/react";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Register = () => {
  const { register, result, logIn } = useEmailPasswordAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const showToast = useThemedToast();

  const handleRegister = () => {
    register({ email, password });
  };

  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn({ email, password });
    }
  }, [result, logIn, email, password]);

  useEffect(() => {
    if (result.operation === "register" && result.error) {
      showToast("Registration error:", result.error.message, "error");
    } else if (result.success) {
      showToast("Registration successful", "You are logged in now", "success");
    }
  }, [result]);

  const navigateToLogin = () => {
    router.navigate({ pathname: "login" });
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
        label="Sign Up"
        onPress={handleRegister}
      />
      <View style={styles.footer}>
        <ThemedText>Already have an account?</ThemedText>
        <TouchableOpacity onPress={navigateToLogin}>
          <ThemedText style={styles.link}>Sign In</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
