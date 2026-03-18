import * as React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  ...props
}) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default MotionWrapper;
