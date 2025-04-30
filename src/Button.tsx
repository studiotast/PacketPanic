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
};

export default function Button({
  children,
  onClick,
  shadowColor,
  className,
  type = "button", // Default to "button" type
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
      y: 9, // Move DOWN to overlap with shadow when tapped
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
      >
        {children}
      </motion.div>

      {/* Shadow underneath that stays static */}
      {type === "button" && (
        <div
          className="button-shadow"
          style={{
            backgroundColor: shadowColor || "#dc9329",
            height: "100%",
            width: "100%",
          }}
        />
      )}
    </div>
  );
}
