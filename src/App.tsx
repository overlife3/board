import React, { useEffect } from "react";
import logo from "./logo.svg";
import Area from "./components/Area";
import { SizeArea } from "./types/area";
import { createMapMine, createStartArea } from "./utils/area";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { actions } from "./redux/reducers/area";
import { useAppSelector } from "./hooks/useAppSelector";
function App() {
  const arr = useAppSelector((store) => store.area.arr);

  return (
    <div className="App">
      <Area arr={arr} />
    </div>
  );
}

export default App;
