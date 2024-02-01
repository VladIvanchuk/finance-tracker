import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import ThemedAlert from "../ui/ThemedAlert";

interface AttachmentItemsProps {
  handleClose: () => void;
  setSelectedImage: React.Dispatch<React.SetStateAction<null | string>>;
}

enum PermissionType {
  Camera = "camera",
  Library = "library",
}

const AttachmentItems = ({
  handleClose,
  setSelectedImage,
}: AttachmentItemsProps) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (title: string, message?: string) => {
    setAlertTitle(title);
    message && setAlertMessage(message);
    setAlertVisible(true);
  };

  const getPermission = async (permissionType: PermissionType) => {
    const permissionMethod =
      permissionType === PermissionType.Camera
        ? ImagePicker.requestCameraPermissionsAsync
        : ImagePicker.requestMediaLibraryPermissionsAsync;

    const { status } = await permissionMethod();
    return status === "granted";
  };

  const handleImagePicker = async (pickerType: PermissionType) => {
    const hasPermission = await getPermission(pickerType);
    if (!hasPermission) {
      showAlert(
        "Permission required",
        `Please grant ${
          pickerType === PermissionType.Camera ? "camera" : "camera roll"
        } permissions to use this feature`
      );
      return;
    }

    const pickerMethod =
      pickerType === PermissionType.Camera
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;

    const result = await pickerMethod({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets[0].uri);
      handleClose();
    } else {
      showAlert("Image not selected", ``);
    }
  };

  return (
    <View style={styles.items_wrapper}>
      <Pressable
        style={styles.item_container}
        onPress={() => handleImagePicker(PermissionType.Camera)}
      >
        <Entypo name="camera" size={32} color={palette.blue[100]} />
        <Text style={styles.text}>Camera</Text>
      </Pressable>
      <Pressable
        style={styles.item_container}
        onPress={() => handleImagePicker(PermissionType.Library)}
      >
        <Ionicons name="image" size={32} color={palette.blue[100]} />
        <Text style={styles.text}>Image</Text>
      </Pressable>
      <ThemedAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default AttachmentItems;

const styles = StyleSheet.create({
  items_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 46,
  },
  item_container: {
    padding: 16,
    flex: 1,
    gap: 8,
    alignItems: "center",
    backgroundColor: palette.blue[20],
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    color: palette.blue[100],
  },
});
