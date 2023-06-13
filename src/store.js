import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import persistedRootReducer from "./reducers";
import { persistStore } from 'redux-persist';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  persistedRootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

const persistor = persistStore(store);

export { store, persistor };
