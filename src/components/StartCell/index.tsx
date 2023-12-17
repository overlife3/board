import React from "react";
import { Coordinates, StartCell as TypeStartCell } from "../../types/cell";
import Cell from "../Cell";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { actions } from "../../redux/reducers/area";
import { clickEmptyCell, createMapMine } from "../../utils/area";
import { useAppSelector } from "../../hooks/useAppSelector";
import _ from "lodash";

type Props = { cell: TypeStartCell };

const StartCell = ({ cell }: Props) => {
  const dispatch = useAppDispatch();
  const { width, height, countBomb } = useAppSelector((store) => store.area);
  const onClick = () => {
    const coordinate: Coordinates = [cell.x, cell.y];
    const mapMine = createMapMine(coordinate, width, height, countBomb);
    dispatch(actions.setArr(mapMine));
    dispatch(
      actions.openCells(clickEmptyCell(coordinate, _.cloneDeep(mapMine)))
    );
  };
  return <Cell cell={cell} handleClick={onClick} />;
};

export default StartCell;
