import { useNavigation } from "@react-navigation/native";

export const useGoBack = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return goBack;
};
