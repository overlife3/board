import { BombCell, EmptyCell, StartCell, ValueCell } from "./cell";

export type SizeArea = {
  width: number;
  height: number;
};

export type AreaWithBomb = (BombCell | null)[][];
export type EmptyBomb = null[][];

export type MapMine = (BombCell | ValueCell | EmptyCell | StartCell)[][];
