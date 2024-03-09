import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapMine } from "../../types/area";
import { Coordinates } from "../../types/cell";
type State = {
  arr: MapMine | null;
  width: number;
  height: number;
  countBomb: number;
  countOpenedCells: number;
};

const initialState: State = {
  arr: null,
  width: 10,
  height: 10,
  countBomb: 10,
  countOpenedCells: 0,
};

export const areaReducer = createSlice({
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
        if (state.countBomb > 0) {
          state.arr[x][y].isMarked = true;
          state.countBomb -= 1;
        }
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
  extraReducers(builder) {
    builder.addMatcher(
      (actionsMatch) =>
        actionsMatch.type.startsWith("areaReducer/openCells") ||
        actionsMatch.type.startsWith("areaReducer/setOpenedCell"),
      (state, _) => {
        const arr = state.arr;
        console.log(10);
        if (arr !== null) {
          let countOpenedCells = 0;
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              const cell = arr[i][j];
              if (cell.type !== "bomb" && cell.isOpened === true) {
                countOpenedCells += 1;
              }
            }
          }
          state.countOpenedCells = countOpenedCells;
        }
      }
    );
    // builder.addCase("areaReducer/openCells", (state, _) => {
    //   const arr = state.arr;
    //   console.log(10);

    //   if (arr !== null) {
    //     for (let i = 0; i < arr.length; i++) {
    //       for (let j = 0; j < arr[i].length; j++) {
    //         const cell = arr[i][j];
    //         if (cell.type !== "bomb" && cell.isOpened === true) {
    //           state.countOpenedCells += 1;
    //         }
    //       }
    //     }
    //   }
    // });
  },
});

export const actions = areaReducer.actions;
export default areaReducer.reducer;
