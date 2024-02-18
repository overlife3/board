import React, { useState } from "react";
import style from "./style.module.scss";
import MarineImg from "../../img/marine.png";
import { settingMode } from "../../constant/settings";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { actions } from "../../redux/reducers/area";
import { createStartArea } from "../../utils/area";

type TypeMode = "easy" | "medium" | "hard" | "extreme";
const titleByType = {
  easy: "Легко",
  medium: "Средняя",
  hard: "Жесткий",
  extreme: "Крайность",
};
type ModeButtonProps = {
  type: TypeMode;
  onClick: () => void;
  setCheckedType: (type: TypeMode) => void;
  checkedType: TypeMode | null;
};

const ModeButton = ({ onClick, type, checkedType }: ModeButtonProps) => {
  const { height, width, countBomb } = settingMode[type];
  return (
    <button className={style.modeButton} onClick={() => onClick()}>
      <div className={style.button_content}>
        <div className={style.checked}>
          {checkedType === type ? <img src={MarineImg} alt="check" /> : null}
        </div>
        <div className={style.text}>
          <p>{titleByType[type]}</p>
          <p>
            {width}X{height} {countBomb} мины
          </p>
        </div>
      </div>
    </button>
  );
};

const DefaultModeButton = (props: Omit<ModeButtonProps, "onClick">) => {
  const onClick = () => {
    props.setCheckedType(props.type);
  };
  return <ModeButton {...props} onClick={onClick} />;
};

type Props = {
  setVisible: (value: boolean) => void;
};

const Menu = ({ setVisible }: Props) => {
  const dispatch = useAppDispatch();
  const [checkedType, setCheckedType] = useState<TypeMode | null>(null);

  const handleStart = () => {
    if (checkedType) {
      const { width, height } = settingMode[checkedType];
      dispatch(actions.setSettings(settingMode[checkedType]));
      const arr = createStartArea(width, height); // чтобы не показывать пустую область
      dispatch(actions.setArr(arr));
      setVisible(false);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className={style.background}>
      <div className={style.content}>
        <div className={style.header}>Новая игра</div>
        <div className={style.body}>
          <p>
            <DefaultModeButton
              type="easy"
              setCheckedType={setCheckedType}
              checkedType={checkedType}
            />
          </p>
          <p>
            <DefaultModeButton
              type="medium"
              setCheckedType={setCheckedType}
              checkedType={checkedType}
            />
          </p>
          <p>
            <DefaultModeButton
              type="hard"
              setCheckedType={setCheckedType}
              checkedType={checkedType}
            />
          </p>
          <p>
            <DefaultModeButton
              type="extreme"
              setCheckedType={setCheckedType}
              checkedType={checkedType}
            />
          </p>
          <p className={style.btns}>
            <button className={style.cancel} onClick={handleCancel}>
              <div className={style.button_content}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313" />
                </svg>
              </div>
            </button>
            <button className={style.start} disabled={!checkedType}>
              <div className={style.button_content} onClick={handleStart}>
                Начать
              </div>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
