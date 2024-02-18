import Area from "./components/Area";
import Menu from "./components/Menu";
import Skeleton from "./components/Skeleton";
import { TimerContextProvider } from "./context/timer";
import { useAppSelector } from "./hooks/useAppSelector";
function App() {
  return (
    <TimerContextProvider>
      <div className="App">
        <Skeleton />
      </div>
    </TimerContextProvider>
  );
}

export default App;
