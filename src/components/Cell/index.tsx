import React, { useState } from "react";
import style from "./style.module.scss";
import clsx from "clsx";
import { AnyCell } from "../../types/cell";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { actions } from "../../redux/reducers/area";
import { useAppSelector } from "../../hooks/useAppSelector";

type Props = {
  cell: AnyCell;
  handleClick?: () => void;
};

const Cell = ({ cell, handleClick }: Props) => {
  const countBomb = useAppSelector((store) => store.area.countBomb);
  const dispatch = useAppDispatch();
  const x = cell.x;
  const y = cell.y;

  const cellCn = clsx(style.cell, {
    [style.clean]: cell.isOpened,
    [style.bomb]: cell.isOpened && cell.type === "bomb", // если ячейка была открыта и в этой ячейке есть бомба, тогда добавляется этот класс
    [style.value]: cell.isOpened && cell.type === "value", // если ячейка была открыта и в этой ячейке есть цифпа, тогда добавляется этот класс
    [style.flag]: cell.isMarked,
  });

  const openCell = () => {
    if (!cell.isMarked) dispatch(actions.setOpenedCell([x, y]));
  };

  //
  const onContextMenu: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!cell.isOpened) {
      if (cell.isMarked) {
        dispatch(actions.removeMarkedCell([x, y]));
      } else {
        if (countBomb > 0) dispatch(actions.setMarkedCell([x, y]));
      }
    }
  };

  const styleCell: React.CSSProperties = {};

  if (cell.src !== null && cell.isOpened) {
    styleCell.backgroundImage = `url(${cell.src})`;
  }

  const onClick = () => {
    openCell();
    if (handleClick) handleClick();
  };

  return (
    <div
      className={cellCn}
      onClick={onClick}
      style={styleCell}
      onContextMenu={onContextMenu}
    ></div>
  );
};

export default Cell;
