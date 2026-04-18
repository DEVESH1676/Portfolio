import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MagneticWrapper = ({
  children,
  className = "",
  magneticRange = 15, // Max pixel movement from center
}: {
  children: React.ReactNode;
  className?: string;
  magneticRange?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Premium, snappy spring settings
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Limit distance to prevent button flying away
    const safeX = Math.max(-magneticRange, Math.min(magneticRange, distanceX * 0.25));
    const safeY = Math.max(-magneticRange, Math.min(magneticRange, distanceY * 0.25));

    x.set(safeX);
    y.set(safeY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};
