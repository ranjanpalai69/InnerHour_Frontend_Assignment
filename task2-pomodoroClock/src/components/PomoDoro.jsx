import  { useState, useEffect } from "react";
import "../styles/PomoDoro.css";

function PomoDoro() {
  const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [cyclesLimit, setCyclesLimit] = useState(2); // Number of cycles
  const [currentCycle, setCurrentCycle] = useState(1); // Current cycle
  const [timeRemaining, setTimeRemaining] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleTimerEnd();
    }
  }, [timeRemaining]);

  const handleTimerEnd = () => {
    if (currentCycle === cyclesLimit) {
      setIsRunning(false);
    } else if (timeRemaining === 0) {
      if (currentCycle % 2 === 1) {
        setTimeRemaining(breakTime);
      } else {
        setTimeRemaining(workTime);
      }
      setCurrentCycle((prevCycle) => prevCycle + 1);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return (
      <>
        <span className="minute-text">
          {minutes.toString().padStart(2, "0")}
        </span>
        :
        <span className="second-text">
          {seconds.toString().padStart(2, "0")}
        </span>
      </>
    );
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentCycle(1);
    setTimeRemaining(workTime);
  };

  const handleCycleLimitChange = (e) => {
    const limit = parseInt(e.target.value, 10);
    setCyclesLimit(limit);
  };

  return (
    <div className="pomodoro-container">
      <h2 className="pomodoro-title">Pomodoro Clock</h2>

      <div className="input-container">
        <label className="input-label" htmlFor="cycle-limit">
          Cycle Limit:
        </label>
        <input
          type="number"
          id="cycle-limit"
          className="cycle-limit-input"
          value={cyclesLimit}
          onChange={handleCycleLimitChange}
        />
      </div>

      <div className="timer-container">
        <div
          className={`timer ${isRunning ? "running" : ""} ${
            currentCycle % 2 === 1 ? "work" : "break"
          }`}
        >
          <div className="time">{formatTime(timeRemaining)}</div>
        </div>
      </div>
      <div className="cycle-info">
        <p>Cycles Limit: {cyclesLimit}</p>
        <p>Current Cycle: {currentCycle}</p>
      </div>
      <div className="button-container">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="start-button"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="pause-button"
        >
          Pause
        </button>
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomoDoro;
