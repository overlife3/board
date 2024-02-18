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
  width: 10,
  height: 10,
  countBomb: 10,
};

const areaReducer = createSlice({
  name: "areaReducer",
  initialState: initialState,

  reducers: {
    setSettings: (
      state,
      action: PayloadAction<{
        width: number;
        height: number;
        countBomb: number;
      }>
    ) => {
      const { width, height, countBomb } = action.payload;
      state.height = height;
      state.width = width;
      state.countBomb = countBomb;
    },
    setArr: (state, action: PayloadAction<MapMine>) => {
      state.arr = action.payload;
    },
    setMarkedCell: (state, action: PayloadAction<[number, number]>) => {
      if (state.arr) {
        const [x, y] = action.payload;
        state.arr[x][y].isMarked = true;
        state.countBomb -= 1;
      }
    },
    removeMarkedCell: (state, action: PayloadAction<[number, number]>) => {
      if (state.arr) {
        const [x, y] = action.payload;
        state.arr[x][y].isMarked = false;
        state.countBomb += 1;
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
