import { useNavigation, StackActions } from "@react-navigation/native";

export const usePopToTop = () => {
  const navigation = useNavigation();

  const popToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return popToTop;
};
