import React from "react";
import style from "./style.module.scss";
import { counterImages } from "../../constant/counter";
type Props = {
  num: number;
};

const getCounterImage = (num: number, order: number) => {
  const strNum = String(num);
  const strNumOrder = strNum[order - 1];

  if (strNumOrder === undefined) return counterImages.img_0;
  else {
    switch (strNumOrder) {
      case "0":
        return counterImages.img_0;
      case "1":
        return counterImages.img_1;
      case "2":
        return counterImages.img_2;
      case "3":
        return counterImages.img_3;
      case "4":
        return counterImages.img_4;
      case "5":
        return counterImages.img_5;
      case "6":
        return counterImages.img_6;
      case "7":
        return counterImages.img_7;
      case "8":
        return counterImages.img_8;
      case "9":
        return counterImages.img_9;
    }
  }
};

const Counter = ({ num }: Props) => {
  return (
    <div className={style.counter}>
      <span>
        <img src={getCounterImage(num, String(num).length - 2)} alt="" />
      </span>
      <span>
        <img src={getCounterImage(num, String(num).length - 1)} alt="" />
      </span>
      <span>
        <img src={getCounterImage(num, String(num).length)} alt="" />
      </span>
    </div>
  );
};

export default Counter;
