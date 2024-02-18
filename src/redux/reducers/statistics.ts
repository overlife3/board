import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  isDefeat: boolean;
  isWinning: boolean;
  isStart: boolean;
  isPause: boolean;
};

const initialState: State = {
  isDefeat: false,
  isWinning: false,
  isStart: false,
  isPause: false,
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
  },
});

export const actions = statisticsReducer.actions;
export default statisticsReducer.reducer;
