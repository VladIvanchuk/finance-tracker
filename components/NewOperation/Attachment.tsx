import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors, { palette } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import ThemedActionSheet from "../ui/ThemedActionSheet";
import AttachmentItems from "./AttachmentItems";
import { Badge, BadgeIcon, Image } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

interface AttachmentProps {
  onChange: (value: string) => void;
}

const Attachment = ({ onChange }: AttachmentProps) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const handleChange = () => setShowActionSheet(!showActionSheet);

  useEffect(() => {
    if (selectedImage) {
      onChange(selectedImage);
    }
  }, [selectedImage]);

  return (
    <>
      {selectedImage ? (
        <Pressable
          style={styles.image_view}
          onPress={() => setSelectedImage(null)}
        >
          <Badge
            size="md"
            variant="solid"
            borderRadius="$full"
            action="muted"
            style={styles.image_view_badge}
          >
            <AntDesign name="close" size={20} color={palette.dark[20]} />
          </Badge>
          <Image source={selectedImage} alt="Attachment" style={styles.image} />
        </Pressable>
      ) : (
        <Pressable onPress={handleChange} style={styles.input_container}>
          <Entypo name="attachment" size={24} color={Colors.text} />
          <Text style={styles.text}>Add attachment</Text>
        </Pressable>
      )}

      <ThemedActionSheet
        handleClose={handleChange}
        showActionSheet={showActionSheet}
        actionSheetItems={
          <AttachmentItems
            handleClose={handleChange}
            setSelectedImage={setSelectedImage}
          />
        }
      />
    </>
  );
};

export default Attachment;

const styles = StyleSheet.create({
  input_container: {
    borderRadius: 16,
    paddingRight: 12,
    borderColor: Colors.border,
    borderWidth: 1,
    borderStyle: "dashed",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
  image_view: {
    position: "relative",
  },
  image: {
    borderRadius: 8,
  },
  image_view_badge: {
    position: "absolute",
    top: -10,
    left: 60,
    paddingVertical: 5,
    paddingHorizontal: 6,
    zIndex: 10,
  },
});
