import React, { useEffect, useState } from "react";
import useGame from "../../stores/useGame.js";

export default function ReadyScreen() {
  const start = useGame((state) => state.start);
  const [countdown, setCountdown] = useState(3);

  // Handle the countdown animation and game start
  useEffect(() => {
    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        // Stop at 1, don't go to 0
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          return 1;
        }
        return prevCount - 1;
      });
    }, 1000);

    // Start the game after 3 seconds
    const startTimer = setTimeout(() => {
      start();
    }, 3000);

    // Clean up both timers when component unmounts
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(startTimer);
    };
  }, [start]);

  return (
    <div className="ready-screen">
      <div className="ready-content">
        <h2>Get Ready!</h2>
        <div className="countdown">
          Starting in <span className="countdown-number">{countdown}</span>...
        </div>
      </div>
    </div>
  );
}
