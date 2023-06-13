import { SET_CURRENT_USER, USER_LOADING, SET_USER_SETTING } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  settings: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload !== null,
        user: action.payload
      };
    case SET_USER_SETTING:
      return {
        ...state,
        ...action.payload
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
