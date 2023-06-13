import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage engine you want to use

const persistConfig = {
    key: 'root',
    storage,
    // Optionally, you can whitelist or blacklist specific reducers
    // whitelist: ['reducer1', 'reducer2'],
    blacklist: ['article'],
};

const persistedReducer = (rootReducer) => persistReducer(persistConfig, rootReducer);

export default persistedReducer;
