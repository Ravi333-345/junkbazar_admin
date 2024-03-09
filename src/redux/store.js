
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";
import usersSlice from "./user/userSlice";

const config = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(config, usersSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;