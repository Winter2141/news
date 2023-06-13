import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import persistedReducer from './persistConfig';
import articleReducer from "./articleReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  article: articleReducer,
  errors: errorReducer
});

const persistedRootReducer = persistedReducer(rootReducer);

export default persistedRootReducer;
