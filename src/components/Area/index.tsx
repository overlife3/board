import React, { useEffect } from "react";
import style from "./style.module.scss";
import { MapMine } from "../../types/area";
import ValueCell from "../ValueCell";
import BombCell from "../BombCell";
import EmptyCell from "../EmptyCell";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createStartArea } from "../../utils/area";
import { actions } from "../../redux/reducers/area";
import StartCell from "../StartCell";
import { useAppSelector } from "../../hooks/useAppSelector";

type StrokeProps = {
  strokeArr: any[];
};

const StrokeCells = ({ strokeArr }: StrokeProps) => {
  return (
    <div className={style.stroke}>
      {strokeArr.map((item, index) => {
        switch (item.type) {
          case "value":
            return <ValueCell cell={item} key={item.id} />;
          case "bomb":
            return <BombCell cell={item} key={item.id} />;
          case "empty":
            return <EmptyCell cell={item} key={item.id} />;
          default:
            return <StartCell cell={item} key={item.id} />;
        }
      })}
    </div>
  );
};

const Area = () => {
  // const dispatch = useAppDispatch();
  // const { width, height } = useAppSelector((store) => store.area);
  const arr = useAppSelector((store) => store.area.arr);
  // useEffect(() => {
  //   const arr = createStartArea(width, height); // чтобы не показывать пустую область
  //   dispatch(actions.setArr(arr));
  // }, []);
  if (!arr) return <h1>Задайте параметры</h1>;
  return (
    <div className={style.area}>
      {arr.map((item, index) => (
        <StrokeCells strokeArr={item} key={index} />
      ))}
    </div>
  );
};

export default Area;
