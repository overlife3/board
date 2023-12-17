import React from "react";
import { Coordinates, EmptyCell as TypeEmptyCell } from "../../types/cell";
import Cell from "../Cell";
import { useAppSelector } from "../../hooks/useAppSelector";
import { clickEmptyCell } from "../../utils/area";
import { MapMine } from "../../types/area";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { actions } from "../../redux/reducers/area";
import _ from "lodash";
type Props = { cell: TypeEmptyCell };

function EmptyCell({ cell }: Props) {
  const dispatch = useAppDispatch();
  const mapMine = useAppSelector((store) => store.area.arr) as MapMine;
  const onClick = () => {
    const coordinates: Coordinates = [cell.x, cell.y];
    let arr = _.cloneDeep(mapMine);
    dispatch(actions.openCells(clickEmptyCell(coordinates, arr)));
  };

  return <Cell cell={cell} handleClick={onClick} />;
}

export default EmptyCell;
