import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../ui/ThemedText";

const AccountsHeader = () => {
  const router = useRouter();

  const handleLinkPress = () => {
    router.navigate({ pathname: "/addAccount" });
  };
  return (
    <TouchableOpacity style={styles.header_container} onPress={handleLinkPress}>
      <View style={styles.button}>
        <ThemedText style={styles.button_text}>Add account</ThemedText>
      </View>
      <View>
        <Ionicons name="add-circle" size={32} color={Colors.text} />
      </View>
    </TouchableOpacity>
  );
};

export default AccountsHeader;

const styles = StyleSheet.create({
  header_container: {
    paddingHorizontal: 24,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button_text: { fontWeight: "500", fontSize: 16 },
  button: { flexDirection: "row", alignItems: "center", gap: 8 },
});
