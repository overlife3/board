import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapMine } from "../../types/area";
import { Coordinates } from "../../types/cell";
type State = {
  arr: MapMine | null;
  width: number;
  height: number;
  countBomb: number;
};

const initialState: State = {
  arr: null,
  width: 20,
  height: 15,
  countBomb: 60,
};

const areaReducer = createSlice({
  name: "areaReducer",
  initialState: initialState,
  reducers: {
    setArr: (state, action: PayloadAction<MapMine>) => {
      state.arr = action.payload;
    },
    toggleMarkedCell: (state, action: PayloadAction<[number, number]>) => {
      if (state.arr) {
        const [x, y] = action.payload;
        state.arr[x][y].isMarked = !state.arr[x][y].isMarked;
      }
    },
    setOpenedCell: (state, action: PayloadAction<[number, number]>) => {
      if (state.arr) {
        const [x, y] = action.payload;
        state.arr[x][y].isOpened = true;
      }
    },
    openCells: (state, action: PayloadAction<Coordinates[]>) => {
      const coordinates = action.payload;
      if (state.arr)
        for (let i = 0; i < coordinates.length; i++) {
          const [x, y] = coordinates[i];
          state.arr[x][y].isOpened = true;
        }
    },
  },
});

export const actions = areaReducer.actions;
export default areaReducer.reducer;
