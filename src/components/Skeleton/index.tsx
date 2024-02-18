import React from "react";
import style from "./style.module.scss";
import Menu from "../Menu";
import Area from "../Area";
import TopMenu from "../TopMenu";

type Props = {};

const Skeleton = (props: Props) => {
  return (
    <div className={style.skeleton}>
      <div className={style.top_menu}>
        <TopMenu />
      </div>
      <div className={style.area}>
        <Area />
      </div>
    </div>
  );
};

export default Skeleton;
