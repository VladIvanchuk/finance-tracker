import MenuItem from "@/components/Profile/MenuItem";
import ThemedText from "@/components/ui/ThemedText";
import Colors, { palette } from "@/constants/Colors";
import useThemedToast from "@/hooks/useThemedToast";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useAuth, useUser } from "@realm/react";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const Profile = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const user = useUser();
  const { logOut } = useAuth();
  const showToast = useThemedToast();

  useEffect(() => {
    if (user && user.identities[0].providerType !== "anon-user") {
      setIsAuthorized(user.isLoggedIn ?? false);
    }
  }, [user]);

  const handleLogout = () => {
    try {
      if (!user) {
        showToast("No user is currently logged in.", "", "info");
        return;
      }
      logOut();
      showToast("Logged out successfully", "You are logged out now", "success");
    } catch (error) {
      console.error("Logout error:", error);
      showToast(
        "Logout failed:",
        error instanceof Error ? error.message : String(error),
        "error",
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isAuthorized ? (
          <>
            <View style={styles.headerText}>
              <ThemedText style={styles.headerWarning}>Hello</ThemedText>
              <ThemedText style={styles.headerName}>
                {user.profile.email}
              </ThemedText>
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
            href=""
            label="Edit Profile"
            icon={<MaterialIcons name="edit" size={24} color={Colors.text} />}
          />
        )}
        <MenuItem
          href="/categories"
          label="Categories"
          icon={<Entypo name="list" size={28} color={Colors.text} />}
        />
        {isAuthorized ? (
          <MenuItem
            onPress={handleLogout}
            label="Log out"
            icon={<Entypo name="log-out" size={28} color={Colors.text} />}
          />
        ) : (
          <MenuItem
            href="/login"
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
