import Skeleton from "../Skeleton";
import { TimerContextProvider } from "../../context/timer";
import style from "./style.module.scss";
import WinnerWindow from "../WinnerWindow";
function App() {
  return (
    <TimerContextProvider>
      <div className={style.app}>
        <div className={style.content}>
          <Skeleton />
        </div>
        <div className={style.empty_elem}></div>
      </div>
      <WinnerWindow />
    </TimerContextProvider>
  );
}

export default App;
