import React, { createContext, useRef, useState } from "react";

type TimerContextType = {
  handleStart: () => void;
  handlePause: () => void;
  handleReset: () => void;
  handleResume: () => void;
  timer: number;
  isActive: boolean;
  isPaused: boolean;
};

export const TimerContext = createContext<TimerContextType | null>(null);

type TypeChildren = {
  children: React.ReactNode;
};

export const TimerContextProvider = ({ children }: TypeChildren) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef<NodeJS.Timer | null>(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    if (increment.current) {
      clearInterval(increment.current);
      setIsPaused(false);
    }
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    if (increment.current) {
      clearInterval(increment.current);
      setIsActive(false);
      setIsPaused(false);
      setTimer(0);
    }
  };
  return (
    <TimerContext.Provider
      value={{
        handleStart,
        handlePause,
        handleReset,
        handleResume,
        timer,
        isActive,
        isPaused,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
