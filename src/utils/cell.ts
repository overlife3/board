import { nanoid } from "nanoid";
import {
  bombCellShare,
  oneValueCellShare,
  twoValueCellShare,
  threeValueCellShare,
  fourValueCellShare,
  fiveValueCellShare,
  sixValueCellShare,
  emptyCellShare,
  startCellShare,
} from "../constant/cell";
import { BombCell, EmptyCell, ValueCell } from "../types/cell";

export const createBombCell = (x: number, y: number): BombCell => {
  return { id: nanoid(), x: x, y: y, ...bombCellShare };
};

export const createValueCell = (x: number, y: number, countBomb: number) => {
  let cell: ValueCell | null = null;
  switch (countBomb) {
    case 1:
      cell = { id: nanoid(), x, y, ...oneValueCellShare };
      break;
    case 2:
      cell = { id: nanoid(), x, y, ...twoValueCellShare };
      break;
    case 3:
      cell = { id: nanoid(), x, y, ...threeValueCellShare };
      break;
    case 4:
      cell = { id: nanoid(), x, y, ...fourValueCellShare };
      break;
    case 5:
      cell = { id: nanoid(), x, y, ...fiveValueCellShare };
      break;
    default:
      cell = { id: nanoid(), x, y, ...sixValueCellShare };
  }
  return cell;
};

export const createEmptyCell = (x: number, y: number): EmptyCell => {
  return { id: nanoid(), x, y, ...emptyCellShare };
};

export const createStartCell = (x: number, y: number): EmptyCell => {
  return { id: nanoid(), x, y, ...startCellShare };
};
