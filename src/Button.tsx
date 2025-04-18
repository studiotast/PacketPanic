import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./style.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  shadowColor?: string;
  className?: string;
};

export default function Button({
  children,
  onClick,
  shadowColor,
  className,
}: ButtonProps) {
  // Create ref for the top button
  const buttonRef = useRef<HTMLDivElement>(null);
  // Track button styles
  const [buttonStyle, setButtonStyle] = useState({});

  // Get computed styles from the button to apply to shadow
  useEffect(() => {
    if (buttonRef.current) {
      const computedStyle = window.getComputedStyle(buttonRef.current);
      setButtonStyle({
        width: buttonRef.current.offsetWidth + "px",
        height: buttonRef.current.offsetHeight + "px",
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

  return (
    <div className="button-container" onClick={onClick}>
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
      <div
        className="button-shadow"
        style={{
          backgroundColor: shadowColor || "#dc9329",
          ...buttonStyle, // Apply computed styles from the button
        }}
      />
    </div>
  );
}
