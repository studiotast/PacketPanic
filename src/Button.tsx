import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./style.css";
import useGame from "./stores/useGame";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  shadowColor?: string;
  className?: string;
  type?: string;
  style?: React.CSSProperties;
  isCard?: boolean; // Optional prop to indicate if it's a card
  shadowStyle?: string;
};

export default function Button({
  children,
  onClick,
  shadowColor,
  className,
  type = "button", // Default to "button" type
  style,
  isCard = false, // Default to false
  shadowStyle, // Default to empty object
}: ButtonProps) {
  // Create ref for the top button
  const buttonRef = useRef<HTMLDivElement>(null);
  // Track button styles
  const [buttonStyle, setButtonStyle] = useState({});

  const playSound = useGame((state) => state.playSound);

  // Get computed styles from the button to apply to shadow
  useEffect(() => {
    if (buttonRef.current) {
      const computedStyle = window.getComputedStyle(buttonRef.current);
      setButtonStyle({
        borderRadius: computedStyle.borderRadius,
      });
    }
  }, []);

  const buttonVariants = {
    initial: {
      y: 0,
    },
    tap: {
      y: shadowStyle ? 3 : 9, // shadowStyle is only given on the tutorial button
      //  @Todo update the game over screen button to use this shadowStyle
    },
  };

  const handleClick = () => {
    // Play sound when button is clicked
    playSound("button");
    onClick();
  };

  return (
    <div className="button-container" onClick={handleClick}>
      {/* Top button that animates */}
      <motion.div
        ref={buttonRef}
        className={className}
        variants={buttonVariants}
        initial="initial"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          ...style,
        }}
      >
        {children}
      </motion.div>

      {/* Shadow underneath that stays static */}
      {type === "button" && (
        <div
          className={shadowStyle ? shadowStyle : "button-shadow"}
          style={{
            backgroundColor: shadowColor || "#dc9329",
            height: "100%",
            width: "100%",
            borderRadius: isCard ? "20px" : "",
          }}
        />
      )}
    </div>
  );
}
