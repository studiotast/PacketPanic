import React, { useEffect, useState } from "react";
import useGame from "../../stores/useGame.js";

export default function ReadyScreen() {
  const start = useGame((state) => state.start);
  const [countdown, setCountdown] = useState(3);
  const playSound = useGame((state) => state.playSound);

  // Handle the countdown animation and game start
  useEffect(() => {
    // Play countdown sound
    playSound("countDown");
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
        {/* Use external SVG file for heading */}
        <div className="ready-heading">
          <img
            src="/images/We-gaan-beginnen.svg"
            alt="We gaan beginnen!"
            width="600"
            height="180"
          />
        </div>

        {/* Use dynamic external SVG file for countdown */}
        <div className="countdown">
          <img
            src={`/images/${countdown}.svg`}
            alt={`Countdown: ${countdown}`}
            width="300"
            height="300"
            className="countdown-svg-text"
          />
        </div>
      </div>
    </div>
  );
}
