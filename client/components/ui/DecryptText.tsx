import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\\\",.<>/?";

interface DecryptTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
}

export const DecryptText: React.FC<DecryptTextProps> = ({ 
  text, 
  className = "", 
  speed = 40,
  maxIterations = 15
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  const triggerAnimation = () => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // Letters start resolving from left to right
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      // Increase iteration slower than the interval to make the scramble last longer per letter
      iteration += 1 / (maxIterations / text.length);

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Ensure final state is correct
      }
    }, speed);

    return interval;
  };

  useEffect(() => {
    // Run once on mount
    const timer = setTimeout(() => {
      triggerAnimation();
    }, 500); // slight delay after mount
    
    return () => clearTimeout(timer);
  }, [text]);

  const handleMouseEnter = () => {
    if (!isHovering) {
      setIsHovering(true);
      triggerAnimation();
    }
  };

  return (
    <motion.span 
      className={`inline-block cursor-default font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};
