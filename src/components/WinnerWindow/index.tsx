import React, { useContext } from "react";
import style from "./style.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";
import marineImage from "../../img/marine.png";
import { TimerContext } from "../../context/timer";
import faceImage from "../../img/face.png";
import okImage from "../../img/ok.svg";

type StatisticRowProps = {
  text: string;
  image: string | null;
  value: number;
};

const StatisticRow = ({ text, image, value }: StatisticRowProps) => {
  return (
    <div className={style.statistic_row}>
      <span className={style.text}>{text}</span>
      <span className={style.value}>
        {value} {image ? <img src={image} alt="" /> : null}
      </span>
    </div>
  );
};

type Props = {};

const WinnerWindow = (props: Props) => {
  const countBomb = useAppSelector((store) => store.area.countBomb);
  const visible = useAppSelector((store) => store.modals.winnerWindowVisible);
  const timerContextData = useContext(TimerContext);

  if (!visible) return null;
  if (!timerContextData) return null;
  const { timer } = timerContextData;

  return (
    <div className={style.window}>
      <div className={style.top}>
        <h2>Ты победил</h2>
      </div>
      <div className={style.body}>
        <StatisticRow
          text="Найдены бомбы:"
          value={countBomb}
          image={marineImage}
        />
        <StatisticRow text="Затраченное время:" value={timer} image={null} />
      </div>
      <div className={style.footer}>
        <div className={style.empty_block}></div>
        <button className={style.ok}>
          <div className={style.content}>
            <img src={okImage} alt="" />
          </div>
        </button>
        <button className={style.menu}>
          <div className={style.content}>
            <img src={faceImage} alt="" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default WinnerWindow;
