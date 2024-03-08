import { combineReducers, configureStore } from "@reduxjs/toolkit";
import area from "./reducers/area";
import statistics from "./reducers/statistics";
import modals from "./reducers/modals";

const rootReducer = combineReducers({
  area: area,
  statistics: statistics,
  modals: modals,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
