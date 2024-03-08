import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  winnerWindowVisible: boolean;
};

const initialState: State = {
  winnerWindowVisible: false,
};

const modalsReducer = createSlice({
  name: "modalsReducer",
  initialState: initialState,
  reducers: {
    setWinnerWindowVisible(state, action: PayloadAction<boolean>) {
      state.winnerWindowVisible = action.payload;
    },
  },
});

export const actions = modalsReducer.actions;
export default modalsReducer.reducer;
