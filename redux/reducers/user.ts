import { CommonActions } from "@react-navigation/native";

const initialState = {
  currentUser: null,
};

export const user = (state: any = initialState, action: any) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};
