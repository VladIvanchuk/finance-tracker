import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ThemedText from "../ui/ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const AccountsHeader = () => {
  return (
    <View style={styles.header_container}>
      <TouchableOpacity style={styles.button}>
        <ThemedText style={styles.button_text}>All accounts</ThemedText>
        <FontAwesome
          name="arrow-right"
          size={14}
          color={Colors.text}
          style={{ marginTop: 1 }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Link href="/addAccount">
          <Ionicons name="add-circle" size={32} color={Colors.text} />
        </Link>
      </TouchableOpacity>
    </View>
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
