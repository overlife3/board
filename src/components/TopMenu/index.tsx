import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import flagImg from "../../img/mine.png";
import Counter from "../Counter";
import faceImage from "../../img/face.png";
import { TimerContext } from "../../context/timer";
import Menu from "../Menu";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { actions } from "../../redux/reducers/statistics";
import { actions as actionsArea } from "../../redux/reducers/area";
import clsx from "clsx";
import { count } from "console";
type Props = {};

const TopMenu = (props: Props) => {
  const { countBomb, countMarkedBomb, countOpenedCells, height, width } =
    useAppSelector((store) => store.area);
  const { isStart, isPause, isWinning, isDefeat, mode } = useAppSelector(
    (store) => store.statistics
  );
  const dispatch = useAppDispatch();
  const timerContextData = useContext(TimerContext);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  useEffect(() => {
    if (isStart && handleStart) handleStart();
  }, [isStart]);
  useEffect(() => {
    if (isPause && !isWinning && !isDefeat && handlePause) handlePause();
    if (!isPause && !isWinning && !isDefeat && isStart && handleResume)
      handleResume();
  }, [isPause]);
  useEffect(() => {
    if ((isWinning || isDefeat) && handleReset) handleReset();
  }, [isWinning, isDefeat]);

  if (!timerContextData) return null;
  const {
    handlePause,
    handleReset,
    handleResume,
    handleStart,
    isActive,
    isPaused,
    timer,
  } = timerContextData;

  if (countOpenedCells === width * height - countBomb) {
    dispatch(actions.setIsWinning(true));
  }

  const handleFace = () => {
    setIsMenuVisible((prevState) => !prevState);
    dispatch(actions.setIsPause(true));
  };
  const handleFlag = () => {
    if (mode === "default") dispatch(actions.setMode("flag"));
    else dispatch(actions.setMode("default"));
  };

  const autoFlagModeCn = clsx(style.auto_flag_mode, {
    [style.flagMode]: mode === "flag",
  });
  return (
    <>
      <div className={style.top_menu}>
        <div className={style.btns}>
          <button className={autoFlagModeCn} onClick={handleFlag}>
            <span className={style.content}>
              <img src={flagImg} alt="" />
            </span>
          </button>
        </div>
        <div className={style.counter}>
          <Counter num={timer} />
          <button className={style.face} onClick={handleFace}>
            <span className={style.content}>
              <img src={faceImage} alt="" />
            </span>
          </button>
          <Counter num={countBomb - countMarkedBomb} />
        </div>
        <div className={style.empty_elem}></div>
      </div>

      {isMenuVisible ? <Menu setVisible={setIsMenuVisible} /> : null}
    </>
  );
};

export default TopMenu;
