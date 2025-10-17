import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export const Container = ({ className, children, size = "lg", ...props }: ContainerProps) => {
  const sizes: Record<string, string> = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  return (
    <div className={cn("mx-auto px-6", sizes[size], className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
