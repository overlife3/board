import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "../../types/share";

type State = {
  isDefeat: boolean;
  isWinning: boolean;
  isStart: boolean;
  isPause: boolean;
  mode: Mode;
};

const initialState: State = {
  isDefeat: false,
  isWinning: false,
  isStart: false,
  isPause: false,
  mode: "default",
};

const statisticsReducer = createSlice({
  name: "areaReducer",
  initialState: initialState,
  reducers: {
    setIsStart(state, action: PayloadAction<boolean>) {
      state.isStart = action.payload;
    },
    setIsDefeat(state, action: PayloadAction<boolean>) {
      state.isDefeat = action.payload;
    },
    setIsWinning(state, action: PayloadAction<boolean>) {
      state.isWinning = action.payload;
    },
    setIsPause(state, action: PayloadAction<boolean>) {
      state.isPause = action.payload;
    },
    startNewPlay(state, action: PayloadAction<void>) {
      state.isPause = initialState.isPause;
      state.isDefeat = initialState.isDefeat;
      state.isStart = initialState.isStart;
      state.isWinning = initialState.isWinning;
    },
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
  },
});

export const actions = statisticsReducer.actions;
export default statisticsReducer.reducer;
