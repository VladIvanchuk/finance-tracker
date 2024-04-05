import MenuItem from "@/components/Profile/MenuItem";
import ThemedText from "@/components/ui/ThemedText";
import Colors, { palette } from "@/constants/Colors";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const Profile = () => {
  const isAuthorized = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isAuthorized ? (
          <>
            <View style={styles.headerPhoto}></View>
            <View style={styles.headerText}>
              <ThemedText style={styles.headerTitle}>Username</ThemedText>
              <ThemedText style={styles.headerName}>Vlad Ivanchuk</ThemedText>
            </View>
          </>
        ) : (
          <>
            <View style={styles.headerPhoto}>
              <AntDesign name="warning" size={54} color={palette.yellow[100]} />
            </View>
            <View style={styles.headerText}>
              <ThemedText style={styles.headerWarningTitle}>Warning</ThemedText>
              <ThemedText style={styles.headerWarning}>
                Your data may be lost
              </ThemedText>
              <ThemedText style={styles.headerTitle}>
                Please log in to synchronize your data
              </ThemedText>
            </View>
          </>
        )}
      </View>
      <View style={styles.menu}>
        {isAuthorized && (
          <MenuItem
            label="Edit Profile"
            icon={<MaterialIcons name="edit" size={24} color={Colors.text} />}
          />
        )}
        <MenuItem
          label="Categories"
          icon={<Entypo name="list" size={28} color={Colors.text} />}
        />
        <MenuItem
          label="Currency"
          icon={
            <MaterialIcons
              name="currency-exchange"
              size={28}
              color={Colors.text}
            />
          }
        />
        {isAuthorized ? (
          <MenuItem
            label="Log out"
            icon={<Entypo name="log-out" size={28} color={Colors.text} />}
          />
        ) : (
          <MenuItem
            label="Log in"
            icon={<Entypo name="login" size={28} color={Colors.text} />}
          />
        )}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 28,
  },
  menu: {
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  headerPhoto: {
    width: 100,
    height: 100,
    backgroundColor: Colors.tintDark,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    gap: 4,
    flex: 1,
  },
  headerTitle: {
    color: Colors.textSecondary,
  },
  headerName: {
    fontSize: 24,
    fontWeight: "600",
  },
  headerWarningTitle: {
    color: palette.yellow[100],
    fontWeight: "600",
  },
  headerWarning: {
    fontSize: 20,
    fontWeight: "600",
  },
});
