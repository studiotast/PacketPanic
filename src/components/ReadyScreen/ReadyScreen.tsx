import React, { useEffect, useState } from "react";
import useGame from "../../stores/useGame";
import styles from "./ReadyScreen.module.scss";

const ReadyScreen: React.FC = () => {
  const start = useGame((state) => state.start);
  const [countdown, setCountdown] = useState(3);
  const playSound = useGame((state) => state.playSound);

  // Handle the countdown animation and game start
  useEffect(() => {
    const delayStartInterval = setTimeout(() => {
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

      return () => {
        clearInterval(countdownInterval);
        clearTimeout(startTimer);
      };
    }, 1250); // Delay before starting the countdown

    // Clean up both timers when component unmounts
    return () => {
      clearTimeout(delayStartInterval);
    };
  }, [start, playSound]);

  return (
    <div className={styles.readyScreen}>
      <div className={styles.readyContent}>
        {/* Use external SVG file for heading */}
        <div className={styles.readyHeading}>
          <img
            src="/images/We-gaan-beginnen.svg"
            alt="We gaan beginnen!"
            width="600"
            height="180"
          />
        </div>

        {/* Use dynamic external SVG file for countdown */}
        <div className={styles.countdown}>
          <img
            src={`/images/${countdown}.svg`}
            alt={`Countdown: ${countdown}`}
            width="300"
            height="300"
            className={styles.countdownSvgText}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadyScreen;
