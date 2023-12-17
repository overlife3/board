import { BombShareCell, EmptyShareCell, ValueShareCell } from "../types/cell";
import num_1 from "../img/num-1.png";
import num_2 from "../img/num-2.png";
import num_3 from "../img/num-3.png";
import num_4 from "../img/num-4.png";
import num_5 from "../img/num-5.png";
import num_6 from "../img/num-6.png";
import bombImg from "../img/marine.png";
import { Colors } from "../types/share";

export const oneValueCellShare: ValueShareCell = {
  type: "value",
  color: Colors.blue,
  value: 1,
  src: num_1,
  isMarked: false,
  isOpened: false,
};

export const twoValueCellShare: ValueShareCell = {
  type: "value",
  color: Colors.green,
  value: 2,
  src: num_2,
  isMarked: false,
  isOpened: false,
};

export const threeValueCellShare: ValueShareCell = {
  type: "value",
  color: Colors.red,
  value: 3,
  src: num_3,
  isMarked: false,
  isOpened: false,
};

export const fourValueCellShare: ValueShareCell = {
  type: "value",
  color: Colors.violet,
  value: 4,
  src: num_4,
  isMarked: false,
  isOpened: false,
};

export const fiveValueCellShare: ValueShareCell = {
  type: "value",
  color: Colors.yellow,
  value: 5,
  src: num_5,
  isMarked: false,
  isOpened: false,
};

export const sixValueCellShare: ValueShareCell = {
  type: "value",
  color: Colors.lilac,
  value: 6,
  src: num_6,
  isMarked: false,
  isOpened: false,
};

export const bombCellShare: BombShareCell = {
  type: "bomb",
  isMarked: false,
  isOpened: false,
  src: bombImg,
};

export const emptyCellShare: EmptyShareCell = {
  type: "empty",
  isMarked: false,
  isOpened: false,
  src: null,
};

export const startCellShare: EmptyShareCell = {
  type: "start",
  isMarked: false,
  isOpened: false,
  src: null,
};
