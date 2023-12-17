import { combineReducers, configureStore } from "@reduxjs/toolkit";
import area from "./reducers/area";

const rootReducer = combineReducers({
  area: area,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
