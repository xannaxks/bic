"use client";

import { useState, useEffect } from "react";

interface AnimatedBarProps {
  percentage: number;
  shouldAnimate: boolean;
  delay?: number;
  color?: string;
}

export function AnimatedBar({
  percentage,
  shouldAnimate,
  delay = 0,
}: AnimatedBarProps) {
  const [width, setWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated) return;

    const timer = setTimeout(() => {
      setWidth(percentage);
      setHasAnimated(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [shouldAnimate, hasAnimated, percentage, delay]);

  return (
    <div className="w-full">
      {/* Progress Bar Container */}
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <div
          className="from-primary to-primary/80 cubic-bezier(0.4, 0, 0.2, 1) h-full rounded-full bg-gradient-to-r transition-all duration-[2000ms]"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)) 80%)`,
          }}
          role="progressbar"
          aria-valuenow={width}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${width}%`}
        />
      </div>
    </div>
  );
}
