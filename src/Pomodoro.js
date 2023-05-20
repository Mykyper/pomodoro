import React, { useState, useEffect } from "react";

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60); // Temps en secondes
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pomodoroLength, setPomodoroLength] = useState(25);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if ((!isActive || isPaused) && time !== pomodoroLength * 60) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, time, pomodoroLength]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(pomodoroLength * 60);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handlePomodoroLengthChange = (event) => {
    setPomodoroLength(parseInt(event.target.value));
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <div>
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>
        <span>:</span>
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <div>
        {!isActive && !isPaused && (
          <>
            <button onClick={handleStart}>Start</button>
            <select value={pomodoroLength} onChange={handlePomodoroLengthChange}>
              <option value={25}>25 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={35}>35 minutes</option>
            </select>
          </>
        )}
        {(isActive || isPaused) && (
          <>
            <button onClick={handleStop}>Stop</button>
            {isPaused ? (
              <button onClick={handleResume}>Resume</button>
            ) : (
              <button onClick={handlePause}>Pause</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
