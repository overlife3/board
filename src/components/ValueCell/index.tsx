import React from "react";
import { Coordinates, ValueCell as TypeValueCell } from "../../types/cell";
import Cell from "../Cell";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { MapMine } from "../../types/area";
import { actions } from "../../redux/reducers/area";
import { clickValueCell } from "../../utils/area";
import _ from "lodash";

type Props = { cell: TypeValueCell };

function ValueCell({ cell }: Props) {
  const dispatch = useAppDispatch();
  const mapMine = useAppSelector((store) => store.area.arr) as MapMine;

  // обработка собыитя нажатия на ячейку с цифрой
  const onClick = () => {
    const coordinates: Coordinates = [cell.x, cell.y];
    let arr = _.cloneDeep(mapMine);
    dispatch(actions.openCells(clickValueCell(coordinates, arr)));
  };
  return <Cell cell={cell} handleClick={onClick} />;
}

export default ValueCell;
