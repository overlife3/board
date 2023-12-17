import { Colors } from "./share";

export type TypeCell = "value" | "bomb" | "empty" | "start";
export type XCoordinate = number;
export type YCoordinate = number;
export type Coordinates = [XCoordinate, YCoordinate];
export type Cell = {
  id: string;
  x: number;
  y: number;
};

export type ShareCell = {
  type: TypeCell;
  color?: Colors[keyof Colors];
  value?: number;
  src: string | null;
  isOpened: boolean;
  isMarked: boolean;
};

export type ValueShareCell = ShareCell & {
  color: Colors[keyof Colors];
  value: number;
  src: string;
};

export type BombShareCell = ShareCell;

export type EmptyShareCell = ShareCell;

export type StartCell = ShareCell & Cell;
export type BombCell = BombShareCell & Cell;
export type ValueCell = ValueShareCell & Cell;
export type EmptyCell = EmptyShareCell & Cell;

export type AnyCell = ValueCell | BombCell | EmptyCell | StartCell;
