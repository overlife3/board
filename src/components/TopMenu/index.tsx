import React, { useContext, useRef, useState } from "react";
import style from "./style.module.scss";
import flagImg from "../../img/mine.png";
import Counter from "../Counter";
import faceImage from "../../img/face.png";
import { TimerContext, TimerContextProvider } from "../../context/timer";
import Menu from "../Menu";
import { useAppSelector } from "../../hooks/useAppSelector";
type Props = {};

const TopMenu = (props: Props) => {
  const countBomb = useAppSelector((store) => store.area.countBomb);
  const timerContextData = useContext(TimerContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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

  const handleFace = () => {
    setIsMenuVisible((prevState) => !prevState);
    handlePause();
  };

  const handleFlag = () => {
    handleStart();
  };

  return (
    <>
      <div className={style.top_menu}>
        <div className={style.btns}>
          <button className={style.auto_flag_mode} onClick={handleFlag}>
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
          <Counter num={countBomb} />
        </div>
        <div className={style.empty_elem}></div>
      </div>

      {isMenuVisible ? <Menu setVisible={setIsMenuVisible} /> : null}
    </>
  );
};

export default TopMenu;
