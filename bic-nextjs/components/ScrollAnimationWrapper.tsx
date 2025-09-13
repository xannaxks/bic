"use client";

import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animation?:
    | "fadeIn"
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleIn";
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function ScrollAnimationWrapper({
  children,
  className,
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: ScrollAnimationWrapperProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const animationClass = isInView ? `animate-${animation}` : "opacity-0";
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(animationClass, className)}
      style={delayStyle}
    >
      {children}
    </div>
  );
}
