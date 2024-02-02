import { palette } from "@/constants/Colors";
import { IconNameType } from "@/types/Transactions";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export const iconConfig = {
  shopping: {
    component: MaterialCommunityIcons,
    name: "shopping",
    color: palette.yellow[100],
    backgroundColor: palette.yellow[20],
  },
  food: {
    component: MaterialCommunityIcons,
    name: "food-apple",
    color: palette.green[100],
    backgroundColor: palette.green[20],
  },
  cash: {
    component: Ionicons,
    name: "cash",
    color: palette.green[100],
    backgroundColor: palette.green[20],
  },
  "money-bill-transfer": {
    component: FontAwesome6,
    name: "money-bill-transfer",
    color: palette.violet[100],
    backgroundColor: palette.violet[20],
  },
  bank: {
    component: MaterialCommunityIcons,
    name: "bank",
    color: palette.red[100],
    backgroundColor: palette.red[20],
  },
  "piggy-bank": {
    component: FontAwesome6,
    name: "piggy-bank",
    color: palette.green[100],
    backgroundColor: palette.green[20],
  },
  car: {
    component: FontAwesome5,
    name: "car",
    color: palette.blue[100],
    backgroundColor: palette.blue[20],
  },
  subscriptions: {
    component: MaterialIcons,
    name: "subscriptions",
    color: palette.violet[100],
    backgroundColor: palette.violet[20],
  },
  gift: {
    component: Ionicons,
    name: "gift",
    color: palette.yellow[100],
    backgroundColor: palette.yellow[20],
  },
  school: {
    component: Ionicons,
    name: "school",
    color: palette.yellow[100],
    backgroundColor: palette.yellow[20],
  },
  sack: {
    component: MaterialCommunityIcons,
    name: "sack",
    color: palette.green[100],
    backgroundColor: palette.green[20],
  },
  house: {
    component: FontAwesome6,
    name: "house",
    color: palette.blue[100],
    backgroundColor: palette.blue[20],
  },
  donate: {
    component: FontAwesome5,
    name: "donate",
    color: palette.green[100],
    backgroundColor: palette.green[20],
  },
  "sack-dollar": {
    component: FontAwesome6,
    name: "sack-dollar",
    color: palette.blue[100],
    backgroundColor: palette.blue[20],
  },
  "masks-theater": {
    component: FontAwesome6,
    name: "masks-theater",
    color: palette.blue[100],
    backgroundColor: palette.blue[20],
  },
  "house-signal": {
    component: FontAwesome6,
    name: "house-signal",
    color: palette.yellow[100],
    backgroundColor: palette.yellow[20],
  },
  heart: {
    component: AntDesign,
    name: "heart",
    color: palette.red[100],
    backgroundColor: palette.red[20],
  },
};
