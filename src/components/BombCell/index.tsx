import React from "react";
import { BombCell as TypeBombCell } from "../../types/cell";
import Cell from "../Cell";

type Props = {
  cell: TypeBombCell;
};

function BombCell({ cell }: Props) {
  // действие по обработке события нажатия на ячейку с бомбой

  return <Cell cell={cell} />;
}

export default BombCell;
