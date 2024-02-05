import { ScrollView, StyleSheet, View, Image } from "react-native";
import React from "react";
import Colors, { palette } from "@/constants/Colors";
import DashedLine from "react-native-dashed-line";
import ThemedText from "../ui/ThemedText";
import { ITransaction } from "@/types/Transactions";

const TransactionViewBody = ({ description, attachment }: ITransaction) => {
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <DashedLine
        dashLength={10}
        dashThickness={1}
        dashGap={5}
        dashColor={palette.dark[20]}
      />
      <View style={styles.body_item}>
        <ThemedText style={styles.body_item_title}>Description</ThemedText>
        <ThemedText style={styles.body_item_text}>{description}</ThemedText>
      </View>
      {attachment && (
        <View style={styles.body_item}>
          <ThemedText style={styles.body_item_title}>Attachment</ThemedText>
          <Image
            source={{
              uri: attachment,
            }}
            alt="Attachment"
            style={styles.image}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default TransactionViewBody;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    marginTop: 50,
    gap: 16,
    flexGrow: 1,
    paddingBottom: 80,
  },
  body_item: {
    gap: 15,
  },
  body_item_title: {
    fontWeight: "400",
    fontSize: 18,
    color: Colors.textSecondary,
  },
  body_item_text: {
    fontWeight: "500",
    fontSize: 18,
  },
  image: {
    borderRadius: 8,
    width: "100%",
    height: 150,
  },
});
