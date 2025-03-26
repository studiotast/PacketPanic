import React, { forwardRef, useEffect, useRef } from "react";
import * as THREE from "three";
import Ball from "./Ball";
import useBalls from "../../../stores/useBalls";
import useGame from "../../../stores/useGame";
import { useFrame } from "@react-three/fiber";
import { useControls, button } from "leva";

const Balls = forwardRef((props, ref) => {
  const { balls, addBall, clearBalls } = useBalls((state) => ({
    balls: state.balls,
    addBall: state.addBall,
    clearBalls: state.clearBalls,
  }));

  // Get game state and level configuration
  const { phase, isPaused, timer, currentLevel } = useGame((state) => ({
    phase: state.phase,
    isPaused: state.isPaused,
    timer: state.timer,
    currentLevel: state.currentLevel,
  }));

  // Get spawner configuration from current level
  const {
    position: BUILDING_POSITION,
    spawnRate,
    minSpawnRate,
    ballColors,
  } = currentLevel.trackConfig.spawner;

  // Consistent ball velocity - use the same values for all balls
  const BALL_VELOCITY = [
    0, // No X spread (horizontal movement)
    5, // Strong upward Y velocity
    -5, // Strong forward velocity (toward player, negative Z)
  ];

  // Control ball generation timing with dynamic speed adjustment
  const ballGenerationRef = useRef({
    timer: 0,
    baseInterval: spawnRate,
    currentInterval: spawnRate,
    minInterval: minSpawnRate,
    lastSpeedIncrease: 0,
  });

  // Add back the manual controls for testing/debugging
  useControls("Balls", {
    spawnRate: {
      value: spawnRate,
      min: 0.5,
      max: 5,
      step: 0.1,
      onChange: (value) => {
        // Update base interval from UI
        ballGenerationRef.current.baseInterval = value;
        // If we haven't started speeding up yet, also update current interval
        if (ballGenerationRef.current.lastSpeedIncrease === 0) {
          ballGenerationRef.current.currentInterval = value;
        }
      },
    },
    yellowBall: button(() => {
      addBall({
        id: `${THREE.MathUtils.generateUUID()}|yellow`,
        position: [
          BUILDING_POSITION[0] + 0.09,
          BUILDING_POSITION[1] + 0.1,
          BUILDING_POSITION[2] - 0.5,
        ],
        velocity: BALL_VELOCITY,
        ref: React.createRef(),
      });
    }),
    purpleBall: button(() => {
      addBall({
        id: `${THREE.MathUtils.generateUUID()}|purple`,
        position: [
          BUILDING_POSITION[0] + 0.09,
          BUILDING_POSITION[1] + 0.1,
          BUILDING_POSITION[2] - 0.5,
        ],
        velocity: BALL_VELOCITY,
        ref: React.createRef(),
      });
    }),
    greenBall: button(() => {
      addBall({
        id: `${THREE.MathUtils.generateUUID()}|green`,
        position: [
          BUILDING_POSITION[0] + 0.09,
          BUILDING_POSITION[1] + 0.1,
          BUILDING_POSITION[2] - 0.5,
        ],
        velocity: BALL_VELOCITY,
        ref: React.createRef(),
      });
    }),
    clearAllBalls: button(() => {
      clearBalls();
    }),
  });

  // Clear balls when phase changes to "ready" or "intro"
  useEffect(() => {
    if (phase === "ready" || phase === "intro") {
      clearBalls();
      // Reset spawn interval when game restarts
      ballGenerationRef.current.currentInterval =
        ballGenerationRef.current.baseInterval;
      ballGenerationRef.current.lastSpeedIncrease = 0;
    }
  }, [phase, clearBalls]);

  // Automatically generate balls when game is playing and not paused
  useFrame((state, delta) => {
    if (phase === "playing" && !isPaused) {
      // Calculate how many 10-second intervals have passed
      const timeIntervals = Math.floor(timer / 10);

      // Check if we need to increase speed (entered a new 10-second interval)
      if (timeIntervals > ballGenerationRef.current.lastSpeedIncrease) {
        // Update last speed increase tracker
        ballGenerationRef.current.lastSpeedIncrease = timeIntervals;

        // Calculate new interval: decrease by 20% each time, but don't go below minimum
        const newInterval = Math.max(
          ballGenerationRef.current.currentInterval * 0.8,
          ballGenerationRef.current.minInterval
        );

        // Apply the new interval
        ballGenerationRef.current.currentInterval = newInterval;

        console.log(
          `Speed increased at ${timer.toFixed(
            1
          )}s! New interval: ${newInterval.toFixed(2)}s`
        );
      }

      // Increment the ball generation timer
      ballGenerationRef.current.timer += delta;

      // Check if it's time to generate a new ball using the dynamic interval
      if (
        ballGenerationRef.current.timer >=
        ballGenerationRef.current.currentInterval
      ) {
        // Reset timer
        ballGenerationRef.current.timer = 0;

        // Randomly select ball color from available colors for this level
        const randomColor =
          ballColors[Math.floor(Math.random() * ballColors.length)];

        // Generate ball at the building position
        addBall({
          id: `${THREE.MathUtils.generateUUID()}|${randomColor}`,
          position: [
            BUILDING_POSITION[0] + 0.09,
            BUILDING_POSITION[1] + 0.1,
            BUILDING_POSITION[2] - 0.5,
          ],
          velocity: BALL_VELOCITY,
          ref: React.createRef(),
        });

        console.log("Ball generated at", [
          BUILDING_POSITION[0],
          BUILDING_POSITION[1],
          BUILDING_POSITION[2],
        ]);
      }
    }
  });

  return (
    <>
      {balls.map((ball) => (
        <Ball
          key={ball.id}
          id={ball.id}
          position={ball.position}
          velocity={ball.velocity}
          ref={ball.ref}
        />
      ))}
    </>
  );
});

export default Balls;
